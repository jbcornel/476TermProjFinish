import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';

export async function GET(req) {
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }

  try {
    // Retrieve all messages where the authenticated user is the sender
    const sent = await prisma.message.findMany({
      where: { senderId: auth.userId },
      orderBy: { timestamp: 'desc' }
    });

    return new Response(JSON.stringify(sent), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
