import prisma from '@/lib/prisma';

class RenterBookingNotificationSubscriber {
  constructor(renterId) {
    this.renterId = renterId;
  }

  async update({ event, booking }) {
    console.log(`Renter ${this.renterId} notified of event "${event}" on booking ${booking.id}`);

    //Create the notification for the renter.
    try {
      await prisma.notification.create({
        data: {
          userId: this.renterId,
          content: `Your booking (ID: ${booking.id}) for car (ID: ${booking.carId}) has an update: "${event}".`
        }
      });
    } catch (error) {
      console.error('Error creating renter notification:', error);
    }
  }
}

export default RenterBookingNotificationSubscriber;
