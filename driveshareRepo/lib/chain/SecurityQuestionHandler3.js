// lib/chain/SecurityQuestionHandler3.js
import Handler from './Handler.js';
import prisma from '@/lib/prisma';

export default class SecurityQuestionHandler3 extends Handler {
  async handle(requestData) {
    const { user, answers } = requestData;
    if (!user) {
      return { success: false, error: 'No user found in request data.' };
    }
    if (!answers || !answers[2]) {
      return { success: false, error: 'Missing answer for question #3.' };
    }

    // Example: find the 3rd question for this user
    const question = await prisma.securityQuestion.findFirst({
      where: { userId: user.id },
      skip: 2,
      take: 1
    });
    if (!question) {
      return { success: false, error: 'Security question #3 not found for user.' };
    }

    if (question.answer !== answers[2]) {
      return { success: false, error: 'Incorrect answer for question #3' };
    }

    return super.handle(requestData);
  }
}
