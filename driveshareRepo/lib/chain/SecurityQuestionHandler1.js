// lib/chain/SecurityQuestionHandler1.js
import Handler from './Handler.js';
import prisma from '@/lib/prisma';

export default class SecurityQuestionHandler1 extends Handler {
  async handle(requestData) {
    const { user, answers } = requestData;
    if (!user) {
      return { success: false, error: 'No user found in request data.' };
    }
    // Check if answers array has at least an index 0
    if (!answers || !answers[0]) {
      return { success: false, error: 'Missing answer for question #1.' };
    }

    // Example: find the 1st question for this user
    const question = await prisma.securityQuestion.findFirst({
      where: { userId: user.id },
      skip: 0,
      take: 1
    });
    if (!question) {
      return { success: false, error: 'Security question #1 not found for user.' };
    }

    if (question.answer !== answers[0]) {
      return { success: false, error: 'Incorrect answer for question #1' };
    }

    // If pass, go to next handler
    return super.handle(requestData);
  }
}
