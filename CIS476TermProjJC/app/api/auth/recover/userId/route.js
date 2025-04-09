// app/api/auth/recovery/userId/route.js
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse the email from the request body
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    console.log("Received email:", email);  // Debugging line

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },  // Only return the userId (id)
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 404 }
      );
    }

    console.log("Fetched userId:", user.id);  // Debugging line

    // Return the userId for the specified email
    return NextResponse.json(
      { userId: user.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching userId by email:", error);
    return NextResponse.json(
      { error: 'An error occurred while fetching userId.' },
      { status: 500 }
    );
  }
}
