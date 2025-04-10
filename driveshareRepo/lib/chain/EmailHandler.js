import Handler from './Handler.js';
import prisma from '@/lib/prisma';

export default class EmailHandler extends Handler {
  async handle(requestData) {
    const { email } = requestData;
    if (!email) {
      return { success: false, error: 'Email is required.' };
    }

    //Find user in DB
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, error: 'No user found with that email.' };
    }

    //Attach user info for next handlers
    requestData.user = user;

    //Proceed to next handler
    return super.handle(requestData);
  }
}
