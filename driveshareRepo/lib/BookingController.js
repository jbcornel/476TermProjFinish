
import prisma from './prisma';
import OwnerBookingNotificationSubscriber from './OwnerBookingNotificationSubscriber';
import RenterBookingNotificationSubscriber from './RenterBookingNotificationSubscriber';

//Controller class to fulfill observer logic with data storage within
//sqlite3 database
class BookingController {
  // Add one subscriber
  async subscribe(bookingId, userId, role) {
   
    await prisma.bookingObserver.create({
      data: { bookingId, userId, role }
    });
  }

  //Remove one subscriber
  async unsubscribe(bookingId, userId) {
    await prisma.bookingObserver.deleteMany({
      where: { bookingId, userId }
    });
  }

  //Notify all current subscribers for this booking
  async notifyEvent(eventType, booking) {
    const observers = await prisma.bookingObserver.findMany({
      where: { bookingId: booking.id }
    });

    for (const { userId, role } of observers) {
      let subscriber;

      if (role === 'owner') {
        subscriber = new OwnerBookingNotificationSubscriber(userId);
      } else if (role === 'renter') {
        subscriber = new RenterBookingNotificationSubscriber(userId);
      }

      if (subscriber) {
        await subscriber.update({ event: eventType, booking });
      }
    }
  }
};

export default new BookingController();
