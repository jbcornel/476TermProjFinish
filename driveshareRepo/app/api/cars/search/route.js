import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl;
    
    //Required parameters
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    if (!startDateParam || !endDateParam) {
      return NextResponse.json(
        { error: 'startDate and endDate are required.' },
        { status: 400 }
      );
    }
    const startDate = new Date(startDateParam);
    const endDate = new Date(endDateParam);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format provided.' },
        { status: 400 }
      );
    }
    
    //Optional filters
    const brandParam = searchParams.get('brand');
    const modelParam = searchParams.get('model');
    const locationParam = searchParams.get('location');
    const yearParam = searchParams.get('year');
    const maxMileageParam = searchParams.get('maxMileage');
    const maxPriceParam = searchParams.get('maxPrice');

    console.log('Search Params:', {
      startDateParam,
      endDateParam,
      brandParam,
      modelParam,
      locationParam,
      yearParam,
      maxMileageParam,
      maxPriceParam,
    });

    //Base conditions: car must be available for the requested date range
    const where = {
      availableFrom: { lte: startDate },
      availableTo: { gte: endDate },
    };

    //Build the filter for the model field (contains both brand and model info)
    if ((brandParam && brandParam.trim() !== "") || (modelParam && modelParam.trim() !== "")) {
      const conditions = [];
      if (brandParam && brandParam.trim() !== "") {
        conditions.push({ model: { contains: brandParam.trim() } });
      }
      if (modelParam && modelParam.trim() !== "") {
        conditions.push({ model: { contains: modelParam.trim() } });
      }
      if (conditions.length > 0) {
        //Place conditions at top level using AND
        where.AND = conditions;
      }
    }

    //Additional optional filters
    if (locationParam && locationParam.trim() !== "") {
      where.location = { contains: locationParam.trim() };
    }
    if (yearParam) {
      const parsedYear = parseInt(yearParam, 10);
      if (!isNaN(parsedYear)) {
        where.year = parsedYear;
      }
    }
    if (maxMileageParam) {
      const parsedMileage = parseInt(maxMileageParam, 10);
      if (!isNaN(parsedMileage)) {
        where.mileage = { lte: parsedMileage };
      }
    }
    if (maxPriceParam) {
      const parsedPrice = parseFloat(maxPriceParam);
      if (!isNaN(parsedPrice)) {
        where.pricePerHour = { lte: parsedPrice };
      }
    }

    console.log("Constructed where clause (before overlapping check):", where);

    //Retrieve a pool of potential cars (fetch up to 50 to allow filtering)
    const potentialCars = await prisma.car.findMany({
      where,
      take: 50,
    });
    console.log("Potential cars:", potentialCars);

    //Manually filter out cars with overlapping bookings
    //For each car, check if there's any booking overlapping the requested date range
    const carsWithNoOverlap = await Promise.all(
      potentialCars.map(async (car) => {
        const overlap = await prisma.booking.findFirst({
          where: {
            carId: car.id,
            startDate: { lt: endDate },
            endDate: { gt: startDate },
          },
        });
        return overlap ? null : car;
      })
    );
    //Filter out null values and limit to 10 results
    const filteredCars = carsWithNoOverlap.filter((car) => car !== null).slice(0, 10);
    console.log("Filtered cars (after overlapping check):", filteredCars);

    return NextResponse.json({ results: filteredCars }, { status: 200 });
  } catch (err) {
    console.error("Error searching cars:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
