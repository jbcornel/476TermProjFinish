import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';
import CarBuilder from '@/lib/CarBuilder';
// import prisma from '@/lib/prisma'
// import { authenticate } from '@/lib/authMiddleware'

export async function GET(req) {
  const auth = await authenticate(req);

  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }

  try {
    const cars = await prisma.car.findMany({
      include: {
        owner: {
          select: { id: true, email: true }
        }
      },
      orderBy: {
        id: 'desc'
      }
    });

    return new Response(JSON.stringify(cars), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching all cars:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch car listings' }), { status: 500 });
  }
}

// export async function POST(req) {
//   const auth = await authenticate(req);
//   if (auth.status !== 200) {
//     return new Response(JSON.stringify(auth.body), { status: auth.status });
//   }

//   const body = await req.json();
//   const { model, year, mileage, location, pricePerHour, availableFrom, availableTo } = body;

//   if (!model || !year || !mileage || !location || !pricePerHour || !availableFrom || !availableTo) {
//     return new Response(JSON.stringify({ error: 'Missing required car fields' }), { status: 400 });
//   }

//   try {
//     const newCar = await prisma.car.create({
//       data: {
//         model,
//         year: Number(year),
//         mileage: Number(mileage),
//         location,
//         pricePerHour: parseFloat(pricePerHour),
//         available: true,
//         ownerId: auth.userId,
//         availableFrom: new Date(availableFrom),
//         availableTo: new Date(availableTo)
//       }
//     });

//     return new Response(JSON.stringify(newCar), { status: 201 });
//   } catch (error) {
//     console.error('Error creating car:', error);
//     return new Response(JSON.stringify({ error: 'Failed to create car' }), { status: 500 });
//   }
// }
export async function POST(req) {
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }

  const body = await req.json();
  const {
    model,
    year,
    mileage,
    location,
    pricePerHour,
    availableFrom,
    availableTo
  } = body;

  if (
    !model || !year || !mileage || !location ||
    !pricePerHour || !availableFrom || !availableTo
  ) {
    return new Response(
      JSON.stringify({ error: "Missing required car fields" }),
      { status: 400 }
    );
  }

  try {
    const carData = new CarBuilder()
      .setModel(model)
      .setYear(year)
      .setMileage(mileage)
      .setLocation(location)
      .setPrice(pricePerHour)
      .setOwnerId(auth.userId)
      .setAvailabilityRange(availableFrom, availableTo)
      .build();

    const newCar = await prisma.car.create({
      data: carData
    });

    return new Response(JSON.stringify(newCar), { status: 201 });
  } catch (error) {
    console.error("Error creating car:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create car" }),
      { status: 500 }
    );
  }
}