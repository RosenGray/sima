import { SESSION_CONFIG } from '@/lib/auth/config';
import { isSimaError } from '@/lib/errors/utils';
import { NextResponse } from 'next/server'


export async function POST() {
  try {
    const response = NextResponse.json({ session: null }, { status: 200 });
    response.cookies.set(SESSION_CONFIG.name, '', { ...SESSION_CONFIG, maxAge: 0 });
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

