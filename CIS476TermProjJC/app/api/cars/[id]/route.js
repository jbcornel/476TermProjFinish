import prisma from '@/lib/prisma'
import { authenticate } from '@/lib/authMiddleware'
import { NextResponse } from "next/server";
export async function GET(req, context) {

  const auth = await authenticate(req);

  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }
  var params = await context.params;
  const id = Number(params.id);
  

  try {
    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        owner: {
          select: { id: true, email: true }
        }
      }
    });

    if (!car) {
      return new Response(JSON.stringify({ error: 'Car not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(car), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function PUT(req, context) {
  var params = await context.params;
  const id = Number(params.id);
  const auth = await authenticate(req);

  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }

  const car = await prisma.car.findUnique({ where: { id } });
  if (!car || car.ownerId !== auth.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized to update this car' }), { status: 403 });
  }

  const body = await req.json();
  const { model, year, mileage, location, pricePerHour, available, availableFrom, availableTo } = body;

  try {
    const updated = await prisma.car.update({
      where: { id },
      data: {
        model,
        year: Number(year),
        mileage: Number(mileage),
        location,
        pricePerHour: parseFloat(pricePerHour),
        available,
        availableFrom: new Date(availableFrom),
        availableTo: new Date(availableTo)
      }
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// export async function DELETE(req, context) {
//   const params = await context.params;
//   const id = Number(params.id);
  
//   // Authenticate the request.
//   const auth = await authenticate(req);
//   if (auth.status !== 200) {
//     return new Response(JSON.stringify(auth.body), { status: auth.status });
//   }
  
//   // Fetch the car listing.
//   const car = await prisma.car.findUnique({
//     where: { id },
//   });
  
//   if (!car) {
//     return new Response(JSON.stringify({ error: "Car not found" }), { status: 404 });
//   }
  
//   // Only allow deletion if the authenticated user is the owner.
//   if (car.ownerId !== auth.userId) {
//     return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
//   }
  
//   // Check for active bookings (ignoring cancelled ones)
//   const activeBookings = await prisma.booking.findMany({
//     where: {
//       carId: id,
//       status: { not: "cancelled" }
//     }
//   });
  
//   if (activeBookings.length > 0) {
//     return new Response(
//       JSON.stringify({ error: "Cannot delete car listing: Active bookings exist." }),
//       { status: 400 }
//     );
//   }
  
//   try {
//     // Delete the car listing.
//     const deletedCar = await prisma.car.delete({
//       where: { id }
//     });
    
//     return NextResponse.redirect(new URL("/", req.url));
//   } catch (error) {
//     console.error("Error deleting car:", error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }
export async function DELETE(req, context) {
  const { id } = context.params;
  const carId = Number(id);

  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }

  const car = await prisma.car.findUnique({ where: { id: carId } });
  if (!car) {
    return new Response(JSON.stringify({ error: "Car not found" }), { status: 404 });
  }

  // Only the owner can delete
  if (car.ownerId !== auth.userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
  }

  // Check for active bookings (not cancelled)...
  const activeBookings = await prisma.booking.findMany({
    where: {
      carId: carId,
      status: { not: "cancelled" }
    }
  });
  if (activeBookings.length > 0) {
    return new Response(
      JSON.stringify({ error: "Cannot delete car listing: Active bookings exist." }),
      { status: 400 }
    );
  }

  // Proceed with deletion
  await prisma.car.delete({ where: { id: carId } });

  // Return JSON success (no HTML redirect!)
  return new Response(JSON.stringify({ message: "Car listing deleted successfully" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}