import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';
import BookingController from '@/lib/BookingController';
import OwnerBookingNotificationSubscriber from '@/lib/OwnerBookingNotificationSubscriber';
import RenterBookingNotificationSubscriber from '@/lib/RenterBookingNotificationSubscriber';

export async function POST(req) {
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }

  const { carId, startDate, endDate } = await req.json();

  //Find the car
  const car = await prisma.car.findUnique({ where: { id: carId } });
  if (!car) {
    return new Response(JSON.stringify({ error: 'Car not found' }), { status: 404 });
  }
  if (car.ownerId === auth.userId) {
    return new Response(JSON.stringify({ error: 'Cannot book your own car' }), { status: 403 });
  }

  //Check for overlapping bookings
  const overlapping = await prisma.booking.findFirst({
    where: {
      carId,
      AND: [
        { startDate: { lt: new Date(endDate) } },
        { endDate: { gt: new Date(startDate) } },
        { status: { not: "cancelled" } } 
      ]
    }
  });
  if (overlapping) {
    return new Response(
      JSON.stringify({ error: 'This car is already booked during the selected dates.' }),
      { status: 409 }
    );
  }

  //Validate booking is within the car's availability window
  if (
    new Date(startDate) < new Date(car.availableFrom) ||
    new Date(endDate) > new Date(car.availableTo)
  ) {
    return new Response(
      JSON.stringify({ error: 'Booking must be within the car’s availability window.' }),
      { status: 400 }
    );
  }

  //Calculate cost based on hourly rate
  const start = new Date(startDate);
  const end = new Date(endDate);
  const durationHours = (end - start) / (1000 * 60 * 60);
  const cost = Math.ceil(durationHours * car.pricePerHour);

  console.log('Booking cost calculation:', {
    bookingStart: start,
    bookingEnd: end,
    durationHours,
    pricePerHour: car.pricePerHour,
    cost
  });
  //Create the booking
  const booking = await prisma.booking.create({
    data: {
      carId,
      renterId: auth.userId,
      startDate: start,
      endDate: end,
      status: 'pending',
      cost,
      paymentStatus: 'unpaid'
    }
  });



  //notification code 

  await BookingController.subscribe(booking.id, car.ownerId, 'owner');
  await BookingController.subscribe(booking.id, auth.userId, 'renter');
  
  await BookingController.notifyEvent('bookingCreated', booking);
  



  return new Response(JSON.stringify({ booking, cost }), { status: 201 });
}


export async function GET(req) {
  //Authenticate the request
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }
  
  try {
    const { searchParams } = new URL(req.url);
    const carId = searchParams.get('carId');
    let bookings;
    
    if (carId) {
      //If carId is provided, return bookings for that car
      bookings = await prisma.booking.findMany({
        where: { carId: Number(carId) },
        orderBy: { startDate: 'asc' }
      });
    } else {
      //If no carId is provided, return bookings for which the authenticated user is the renter
      bookings = await prisma.booking.findMany({
        where: { renterId: auth.userId },
        orderBy: { startDate: 'asc' }
      });
    }
    console.log(bookings)
    return new Response(JSON.stringify({ bookings }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch bookings" }), { status: 500 });
  }
}
