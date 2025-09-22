import { SIMA_AUTH_SESSION_CONFIG } from '@/lib/auth/config';
import { User } from '@/lib/auth/models/User';
import connectDB from '@/lib/mongo/mongodb';
import { NotAuthorizedError } from '@/lib/errors/NotAuthorizedError';
import { isSimaError } from '@/lib/errors/utils';
import { ServerErrorType } from '@/lib/errors/types';
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';


export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get(SIMA_AUTH_SESSION_CONFIG.name)?.value;
    if (!token) {
      throw new NotAuthorizedError(ServerErrorType.AuthTokenNotFound);
    }

    let payload: { email: string };
    try {
      payload = jwt.verify(token, process.env.JWT_KEY!) as { email: string };
    } catch {
      throw new NotAuthorizedError(ServerErrorType.AuthInvalidToken);
    }

    const user = await User.findOne({ email: payload.email });
    if (!user) {
      throw new NotAuthorizedError(ServerErrorType.AuthInvalidToken);
    }

    return NextResponse.json({ currentUser: user }, { status: 200 });
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


