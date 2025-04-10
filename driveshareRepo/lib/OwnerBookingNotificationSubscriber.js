import prisma from '@/lib/prisma';

class OwnerBookingNotificationSubscriber {
  constructor(ownerId) {
    this.ownerId = ownerId;
  }

  // Update signature to accept one object with destructured keys
  async update({ event, booking }) {
    console.log(`Owner ${this.ownerId} notified of event "${event}" on booking ${booking.id}`);

    // Persist the notification for the owner in the database.
    try {
      await prisma.notification.create({
        data: {
          userId: this.ownerId,
          content: `Your car (ID: ${booking.carId}) has a new booking event: "${event}" (Booking ID: ${booking.id}).`
        }
      });
    } catch (error) {
      console.error('Error creating owner notification:', error);
    }
  }
}

export default OwnerBookingNotificationSubscriber;
