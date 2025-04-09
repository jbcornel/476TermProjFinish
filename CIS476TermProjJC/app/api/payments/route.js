import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';
import PaymentProxy from '@/lib/proxy/PaymentProxy';

// Observer imports
import bookingNotificationController from '@/lib/BookingController';
import OwnerBookingNotificationSubscriber from '@/lib/OwnerBookingNotificationSubscriber';
import RenterBookingNotificationSubscriber from '@/lib/RenterBookingNotificationSubscriber';

const paymentProxy = new PaymentProxy('http://localhost:4000'); 
// or 'http://10.0.0.143:4000' if your mock payment server is on that IP

export async function POST(req) {
  try {
    const auth = await authenticate(req);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.body), { status: auth.status });
    }

    const body = await req.json();
    const { bookingId } = body;

    // 1. Validate booking
    const booking = await prisma.booking.findUnique({
      where: { id: Number(bookingId) },
      include: {
        car: true
      }
    });
    if (!booking) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), { status: 404 });
    }

    // Ensure user is the renter who owns this booking (or you could allow the owner, if you prefer)
    if (booking.renterId !== auth.userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized payment attempt' }), { status: 403 });
    }

    // 2. Check cost
    if (!booking.cost || booking.cost <= 0) {
      return new Response(JSON.stringify({ error: 'No valid cost associated with this booking' }), { status: 400 });
    }

    if (booking.paymentStatus === 'paid') {
      return new Response(JSON.stringify({ error: 'This booking is already paid' }), { status: 400 });
    }

    // 3. Call Payment Proxy
    const amount = booking.cost;
    const paymentResponse = await paymentProxy.charge(amount, bookingId);

    if (!paymentResponse.success) {
      return new Response(JSON.stringify({ error: paymentResponse.error }), { status: 400 });
    }

    // 4. Update booking status to paid
    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: { paymentStatus: 'paid' },
      include: { car: true } // so we have car.ownerId for notifications
    });

    // 5. Publish a "paid" event to notify both renter & owner
    const eventKey = `booking-${updatedBooking.id}`;

    // Create the two subscriber instances (if they're not already subscribed),
    // or just skip subscription if you're using a persistent approach
    const renterSubscriber = new RenterBookingNotificationSubscriber(updatedBooking.renterId);
    const ownerSubscriber = new OwnerBookingNotificationSubscriber(updatedBooking.car.ownerId);

    bookingNotificationController.subscribe(eventKey, renterSubscriber);
    bookingNotificationController.subscribe(eventKey, ownerSubscriber);

    // Publish the "paid" event
    await bookingNotificationController.publish(eventKey, { event: 'paid', booking: updatedBooking });

    // After publishing the "paid" event
    bookingNotificationController.unsubscribe(eventKey, ownerSubscriber);
    bookingNotificationController.unsubscribe(eventKey, renterSubscriber);

    // If you want to keep them subscribed for future updates, do NOT unsubscribe
    // If this is the final step, you can unsubscribe them
    // bookingNotificationController.unsubscribe(eventKey, renterSubscriber);
    // bookingNotificationController.unsubscribe(eventKey, ownerSubscriber);

    // 6. Persist notifications for both parties
    await prisma.notification.create({
      data: {
        userId: updatedBooking.renterId,
        content: `You have successfully paid for booking (ID: ${updatedBooking.id}).`
      }
    });
    await prisma.notification.create({
      data: {
        userId: updatedBooking.car.ownerId,
        content: `Booking (ID: ${updatedBooking.id}) on your car has just been paid.`
      }
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Payment successful for booking ${updatedBooking.id}.`,
        paymentResponse
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment route error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
