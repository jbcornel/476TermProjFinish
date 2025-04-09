// src/app/api/messages/route.js
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';

export async function POST(req) {
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }
  
  const { receiverId, content } = await req.json();
  if (!receiverId || !content) {
    
    return new Response(JSON.stringify({ error: "Missing receiverId or content" }), { status: 400 });
  }
  
  try {
    const message = await prisma.message.create({
      data: {
        senderId: parseInt(auth.userId),
        receiverId: Number(receiverId),
        content,
        timestamp: new Date()
      }
    });
    
    return new Response(JSON.stringify(message), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(req) {
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }
  
  const { searchParams } = new URL(req.url);
  const withUserId = searchParams.get('with');
  if (!withUserId) {
    return new Response(JSON.stringify({ error: "Missing 'with' query param" }), { status: 400 });
  }
  
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: auth.userId, receiverId: Number(withUserId) },
          { senderId: Number(withUserId), receiverId: auth.userId }
        ]
      },
      orderBy: { timestamp: 'asc' }
    });
    
    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
