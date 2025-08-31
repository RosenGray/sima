


import { SESSION_CONFIG } from '@/lib/auth/config';
import { User } from '@/lib/auth/models/User';
import { PasswordManager } from '@/lib/auth/services/PasswordManager';
import { jwtSignUser } from '@/lib/auth/utils/auth.utils';
import { BadRequestError } from '@/lib/errors/BadRequestError';
import { RequestValidationErrorWithZod } from '@/lib/errors/RequestValidationErrorWithZod';
import { ServerErrorType } from '@/lib/errors/types';
import { isSimaError } from '@/lib/errors/utils';
import connectDB from '@/lib/mongo/mongodb';
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod';
import { zfd } from 'zod-form-data';


const LoginSchema = zfd.formData({
  email: zfd.text(z.string({ message: 'Неверный формат электронной почты' }).email({ message: 'Неверный формат электронной почты' })),
  password: zfd.text(z.string({ message: 'Пароль обязателен' }).min(1, { message: 'Пароль обязателен' })),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const result = LoginSchema.safeParse(formData);
    if (!result.success) {
      throw new RequestValidationErrorWithZod(result.error);
    }

    const { email, password } = result.data;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError(
        'Неверный email или пароль',
        ServerErrorType.AuthWrongPasswordOrEmail
      );
    }

    const passwordsMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError(
        'Неверный email или пароль',
        ServerErrorType.AuthWrongPasswordOrEmail
      );
    }

    const response = NextResponse.json(existingUser, { status: 200 });

    const userJwt = jwtSignUser(existingUser);
    response.cookies.set(SESSION_CONFIG.name, userJwt, SESSION_CONFIG);

    return response;
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


