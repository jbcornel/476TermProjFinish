// lib/chain/SecurityQuestionHandler2.js
import Handler from './Handler.js';
import prisma from '@/lib/prisma';

export default class SecurityQuestionHandler2 extends Handler {
  async handle(requestData) {
    const { user, answers } = requestData;
    if (!user) {
      return { success: false, error: 'No user found in request data.' };
    }
    if (!answers || !answers[1]) {
      return { success: false, error: 'Missing answer for question #2.' };
    }

    // Example: find the 2nd question for this user
    const question = await prisma.securityQuestion.findFirst({
      where: { userId: user.id },
      skip: 1,
      take: 1
    });
    if (!question) {
      return { success: false, error: 'Security question #2 not found for user.' };
    }

    if (question.answer !== answers[1]) {
      return { success: false, error: 'Incorrect answer for question #2' };
    }

    return super.handle(requestData);
  }
}
