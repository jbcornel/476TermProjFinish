// lib/chain/ResetPasswordHandler.js
import Handler from './Handler.js';
import prisma from '@/lib/prisma';
import argon2 from 'argon2';

export default class ResetPasswordHandler extends Handler {
  async handle(requestData) {
    const { user, newPassword } = requestData;
    if (!user) {
      return { success: false, error: 'No user found in request data.' };
    }
    if (!newPassword) {
      return { success: false, error: 'Missing newPassword field.' };
    }

    const hashed = await argon2.hash(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed }
    });

    return super.handle(requestData);
  }
}
