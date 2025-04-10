import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';

export async function GET(req) {
  //Authenticate the request first
  const auth = await authenticate(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.body), { status: auth.status });
  }
  const currentUserId = Number(auth.userId);

  try {
    //Fetch all messages where the current user is either sender or receiver,
    //sorted with the newest messages first
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUserId },
          { receiverId: currentUserId },
        ],
      },
      orderBy: { timestamp: 'desc' },
    });

    //Group messages by conversation partner
    //Since messages are sorted descending, the first message we see for a given partner
    //is the most recent one.
    const conversationMap = {};
    messages.forEach((msg) => {
      //Determine the conversation partner regardless of whether the current user is the sender or receiver
      const partnerId = msg.senderId === currentUserId ? msg.receiverId : msg.senderId;
      if (!conversationMap[partnerId]) {
        conversationMap[partnerId] = {
          partnerId,
          lastMessage: msg.content,
          timestamp: msg.timestamp,
        };
      }
    });
    const conversations = Object.values(conversationMap);
    
    return new Response(JSON.stringify({ conversations }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
