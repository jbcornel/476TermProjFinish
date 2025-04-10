
import { NextResponse } from 'next/server';
import EmailHandler from '@/lib/chain/EmailHandler.js';
import SecurityQuestionHandler1 from '@/lib/chain/SecurityQuestionHandler1.js';
import SecurityQuestionHandler2 from '@/lib/chain/SecurityQuestionHandler2.js';
import SecurityQuestionHandler3 from '@/lib/chain/SecurityQuestionHandler3.js';
import ResetPasswordHandler from '@/lib/chain/ResetPasswordHandler.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, answers, newPassword } = body;

    //Build the chain
    const emailHandler = new EmailHandler();
    const questionHandler1 = new SecurityQuestionHandler1();
    const questionHandler2 = new SecurityQuestionHandler2();
    const questionHandler3 = new SecurityQuestionHandler3();
    const resetHandler = new ResetPasswordHandler();

    //Link them: Email -> Q1 -> Q2 -> Q3 -> Reset
    emailHandler
      .setNext(questionHandler1)
      .setNext(questionHandler2)
      .setNext(questionHandler3)
      .setNext(resetHandler);

    //Execute the chain
    const result = await emailHandler.handle({ email, answers, newPassword });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: 'Password has been reset successfully.' }, { status: 200 });
  } catch (err) {
    console.error('Recover password error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
