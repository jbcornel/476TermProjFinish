import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    //Extract the userId from the query parameters
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get('userId');
    console.log("Received userId:", userId);

    //Ensure userId exists and is a valid number
    if (!userId || isNaN(parseInt(userId))) {
      console.error("Invalid userId:", userId);
      return NextResponse.json({ error: 'Invalid userId provided.' }, { status: 400 });
    }

    //Fetch the security questions associated with the userId
    const securityQuestions = await prisma.securityQuestion.findMany({
      where: {
        userId: parseInt(userId), // Ensure it's treated as an integer
      },
      select: {
        prompt: true, //Selecting the 'prompt' field (the question text)
      },
    });
    console.log(securityQuestions)
    if (securityQuestions.length === 0) {
      return NextResponse.json({ error: 'No security questions found for this user.' }, { status: 404 });
    }

    //Return the questions to the client
    return NextResponse.json({ questions: securityQuestions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching security questions:", error);
    return NextResponse.json({ error: 'An error occurred while fetching security questions.' }, { status: 500 });
  }
}
