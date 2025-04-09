import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';

export async function GET(req) {
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }
  
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        car: { ownerId: parseInt(auth.userId) }
      },
      include: {
        car: {
          select: {
            id: true,
            model: true,
            location: true,
            pricePerHour: true,
            availableFrom: true,
            availableTo: true
          }
        },
        renter: {
          select: { id: true, username: true, email: true }
        }
      },
      orderBy: { startDate: 'desc' }
    });
    
    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
