import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';
import BookingController from '@/lib/BookingController';
import OwnerBookingNotificationSubscriber from '@/lib/OwnerBookingNotificationSubscriber';
import RenterBookingNotificationSubscriber from '@/lib/RenterBookingNotificationSubscriber';

export async function GET(req, context) {
  const params = await context.params;
  const id = Number(params.id);
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }
  
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      car: true,
      renter: { select: { id: true, username: true, email: true } }
    }
  });
  
  if (!booking || booking.car.ownerId !== auth.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });
  }
  
  return new Response(JSON.stringify(booking), { status: 200 });
}

export async function PUT(req, context) {
  const params = await context.params;
  const id = Number(params.id);
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }
  
  // Load the booking with its car data
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { car: true }
  });
  
  if (!booking || booking.car.ownerId !== auth.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized to modify this booking' }), { status: 403 });
  }
  
  const { startDate, endDate, status } = await req.json();
  
  // Validate that the new dates are within the car's availability window
  if (
    new Date(startDate) < new Date(booking.car.availableFrom) ||
    new Date(endDate) > new Date(booking.car.availableTo)
  ) {
    return new Response(JSON.stringify({
      error: 'Booking must be within the car’s availability window.'
    }), { status: 400 });
  }
  
  // Check for overlapping bookings (excluding the current booking)
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
    return new Response(JSON.stringify({
      error: 'These new dates conflict with another booking.'
    }), { status: 409 });
  }
  
  // Recalculate cost
  const durationHours = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60);
  
  const cost = Math.ceil(durationHours * booking.car.pricePerHour);
  
  const updated = await prisma.booking.update({
    where: { id },
    data: {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      cost,
      status: status || booking.status
    }
  });
  
  await BookingController.notifyEvent('updated', booking);



  // // Use a persistent event channel for this booking
  // const eventKey = `booking-${booking.id}`;
  // const ownerSubscriber = new OwnerBookingNotificationSubscriber(auth.userId);
  // const renterSubscriber = new RenterBookingNotificationSubscriber(booking.renterId);
  
  // // Subscribe both parties if not already subscribed
  // bookingNotificationController.subscribe(eventKey, ownerSubscriber);
  // bookingNotificationController.subscribe(eventKey, renterSubscriber);
  
  // // Publish an "updated" event; do not unsubscribe to maintain persistent subscription
  // await bookingNotificationController.publish(eventKey, { event: 'updated', booking: updated });
  

  // bookingNotificationController.unsubscribe(eventKey, ownerSubscriber);
  // bookingNotificationController.unsubscribe(eventKey, renterSubscriber);
  
  // // Persist notifications for both parties
  // await prisma.notification.create({
  //   data: {
  //     userId: auth.userId,
  //     content: `Booking (ID: ${booking.id}) on your car has been updated by you.`
  //   }
  // });
  // await prisma.notification.create({
  //   data: {
  //     userId: booking.renterId,
  //     content: `Your booking (ID: ${booking.id}) for car (ID: ${booking.car.id}) has been updated by the owner.`
  //   }
  // });
  
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req, context) {
  const params = await context.params;
  const id = Number(params.id);
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }
  
  // Load the booking with its car info
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { car: true }
  });
  
  if (!booking || booking.car.ownerId !== auth.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized to cancel this booking' }), { status: 403 });
  }
  

bookingController = new bookingNotificationController()
await BookingController.notifyEvent('cancelled', booking);

await BookingController.unsubscribe(booking.id, car.ownerId);
await BookingController.unsubscribe(booking.id, auth.userId);

await prisma.booking.delete({ where: { id: booking.id } });

  // // Use the persistent event channel for this booking
  // const eventKey = `booking-${booking.id}`;
  // const ownerSubscriber = new OwnerBookingNotificationSubscriber(auth.userId);
  // const renterSubscriber = new RenterBookingNotificationSubscriber(booking.renterId);
  
  // // Subscribe both parties
  // bookingNotificationController.subscribe(eventKey, ownerSubscriber);
  // bookingNotificationController.subscribe(eventKey, renterSubscriber);
  
  // // Publish a "cancelled" event so both parties are notified
  // await bookingNotificationController.publish(eventKey, { event: 'cancelled', booking });
  
  // // Unsubscribe both parties, as the booking lifecycle is complete
  // bookingNotificationController.unsubscribe(eventKey, ownerSubscriber);
  // bookingNotificationController.unsubscribe(eventKey, renterSubscriber);
  
  // Delete the booking from the database
  // await prisma.booking.delete({ where: { id } });
  
  // // Persist notifications for cancellation
  // await prisma.notification.create({
  //   data: {
  //     userId: auth.userId,
  //     content: `Booking (ID: ${booking.id}) on your car has been cancelled by you.`
  //   }
  // });
  // await prisma.notification.create({
  //   data: {
  //     userId: booking.renterId,
  //     content: `Your booking (ID: ${booking.id}) for car (ID: ${booking.car.id}) has been cancelled by the owner.`
  //   }
  // });
  
  return new Response(JSON.stringify({ message: 'Booking cancelled' }), { status: 200 });
}
