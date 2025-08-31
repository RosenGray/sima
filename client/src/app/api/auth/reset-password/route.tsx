import connectDB from '@/lib/mongo/mongodb';
import { User } from '@/lib/auth/models/User';
import { NotAuthorizedError } from '@/lib/errors/NotAuthorizedError';
import { RequestValidationErrorWithZod } from '@/lib/errors/RequestValidationErrorWithZod';
import { ServerErrorType } from '@/lib/errors/types';
import { isSimaError } from '@/lib/errors/utils';
import { generateToken, storeToken } from '@/lib/auth/services/TokenManager/TokenManager';
import { sendPasswordResetEmail } from '@/lib/auth/services/PasswordManager';
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod';
import { zfd } from 'zod-form-data';

//
const ResetPasswordSchema = zfd.formData({
  email: zfd.text(z.email({ message: 'Электронная почта должна быть действующей' })),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const result = ResetPasswordSchema.safeParse(formData);
    if (!result.success) {
      throw new RequestValidationErrorWithZod(result.error);
    }

    const { email } = result.data;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new NotAuthorizedError(ServerErrorType.AuthWrongPasswordOrEmail);
    }

    const token = generateToken();
    await storeToken(email, token);
    const resetPasswordLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${token}`;
    await sendPasswordResetEmail(email, resetPasswordLink);

    return NextResponse.json({
      message:
        'Если аккаунт с таким адресом электронной почты существует, вы получите инструкции по сбросу пароля.',
    }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    if (isSimaError(error)) {
      return NextResponse.json(
        { error: error.serializeErrors() },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


