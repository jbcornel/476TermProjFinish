import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';
import BookingController from '@/lib/BookingController';
import RenterBookingNotificationSubscriber from '@/lib/RenterBookingNotificationSubscriber';
import OwnerBookingNotificationSubscriber from '@/lib/OwnerBookingNotificationSubscriber';

//
// GET: Retrieve booking details if the user is authorized.
// If no booking is found, return a 404 JSON error.
//
export async function GET(req, context) {
  const params = await context.params;
  const id = Number(params.id);
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }
  // Fetch booking with its car details
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { car: true }
  });
  if (!booking) {
    return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
  }
  // Allow access if the user is either the renter or the car owner.
  if (booking.renterId !== auth.userId && booking.car.ownerId !== auth.userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
  }
  return new Response(JSON.stringify(booking), { status: 200 });
}

//
// PUT: Update a booking’s details or approval status.
// If action is "approve", only allow if the authenticated user is the car owner.
// Otherwise, update the booking dates (with validation and overlap checking).
//
export async function PUT(req, context) {
  const params = await context.params;
  const id = Number(params.id);
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }
  
  // Load booking with car details.
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { car: true }
  });
  if (!booking || (booking.renterId !== auth.userId && booking.car.ownerId !== auth.userId)) {
    return new Response(JSON.stringify({ error: "Unauthorized to update booking" }), { status: 403 });
  }
  
  const { startDate, endDate, action, paymentStatus } = await req.json();

  // Payment action: update the booking's paymentStatus to "paid".
  if (action === "paid") {
    const updated = await prisma.booking.update({
      where: { id },
      data: { paymentStatus: "paid" }
    });
    await BookingController.notifyEvent("paid", updated);
    // Optionally, if you have an unsubscribe mechanism, call it here.
    return new Response(JSON.stringify(updated), { status: 200 });
  }

  if (action === "cancelled") {
    const updated = await prisma.booking.update({
      where: { id },
      data: { status: "cancelled" }
    });
    await BookingController.notifyEvent("cancelled", updated);
    // Optionally, if you have an unsubscribe mechanism, call it here.
    return new Response(JSON.stringify(updated), { status: 200 });
  }
  
  // Approval action: only the car owner can approve.
  if (action === "approve") {
    if (booking.car.ownerId !== auth.userId) {
      return new Response(JSON.stringify({ error: "Only the car owner can approve this booking." }), { status: 403 });
    }
    const updated = await prisma.booking.update({
      where: { id },
      data: { status: "approved" }
    });
    await BookingController.notifyEvent("approved", updated);
    return new Response(JSON.stringify(updated), { status: 200 });
  }
  
  // Disapproval action: only the car owner can disapprove.
  if (action === "disapprove") {
    if (booking.car.ownerId !== auth.userId) {
      return new Response(JSON.stringify({ error: "Only the car owner can disapprove this booking." }), { status: 403 });
    }
    const updated = await prisma.booking.update({
      where: { id },
      data: { status: "disapproved" }
    });
    await BookingController.notifyEvent("disapproved", updated);
    return new Response(JSON.stringify(updated), { status: 200 });
  }
  
  // Otherwise, update the booking dates.
  // Validate new dates are within the car's availability window.
  if (
    new Date(startDate) < new Date(booking.car.availableFrom) ||
    new Date(endDate) > new Date(booking.car.availableTo)
  ) {
    return new Response(
      JSON.stringify({ error: "Booking must be within the car’s availability window." }),
      { status: 400 }
    );
  }
  
  // Check for overlapping bookings (excluding the current one).
  const overlapping = await prisma.booking.findFirst({
    where: {
      carId: booking.carId,
      NOT: { id },
      AND: [
        { startDate: { lt: new Date(endDate) } },
        { endDate: { gt: new Date(startDate) } },
        { status: { not: "cancelled" } } 
      ]
    }
  });
  if (overlapping) {
    return new Response(
      JSON.stringify({ error: "Updated dates conflict with another booking." }),
      { status: 409 }
    );
  }
  
  // Recalculate cost based on new dates and car's hourly rate.
  const durationHours = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60);
  const cost = Math.ceil(durationHours * booking.car.pricePerHour);
  const updated = await prisma.booking.update({
    where: { id },
    data: { startDate: new Date(startDate), endDate: new Date(endDate), cost }
  });
  
  await BookingController.notifyEvent("updated", updated);
  return new Response(JSON.stringify(updated), { status: 200 });
}
 

//
// DELETE: Delete a booking. Before deleting the booking,
// delete all associated booking observers, then delete the booking.
// Only allow deletion if the authenticated user is either the renter or the car owner.
// The response is JSON; client should handle redirection.
//
export async function DELETE(req, context) {
  const params = await context.params;
  const id = Number(params.id);
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }
  
  // Fetch booking with its car details.
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { car: true }
  });
  if (!booking || (booking.renterId !== auth.userId && booking.car.ownerId !== auth.userId)) {
    return new Response(JSON.stringify({ error: "Unauthorized to delete booking" }), { status: 403 });
  }
  
  try {
    // Determine if booking qualifies for permanent deletion:
    // It must have ended, be approved, and paid.
    const bookingHasEnded = new Date(booking.endDate) < new Date();
    const canDelete = bookingHasEnded && booking.status === "approved" && booking.paymentStatus === "paid" || booking.status ==='cancelled';
    
    if (canDelete) {
      // Permanent deletion: notify deletion, delete observers, then delete booking.
      await BookingController.notifyEvent("deleted", booking);
      await BookingController.unsubscribe(booking.id, booking.renterId)
      await BookingController.unsubscribe(booking.id, booking.car.ownerId)
      await prisma.booking.delete({ where: { id: booking.id } });
      return new Response(JSON.stringify({ message: "Booking deleted successfully" }), { status: 200 });
    } 
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
