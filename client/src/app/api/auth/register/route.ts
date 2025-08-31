import { SESSION_CONFIG } from '@/lib/auth/config';
import { User } from '@/lib/auth/models/User';
import { RegisterSchema } from '@/lib/auth/types/auth.scema';
import { jwtSignUser } from '@/lib/auth/utils/auth.utils';
import { BadRequestError } from '@/lib/errors/BadRequestError';
import { RequestValidationErrorWithZod } from '@/lib/errors/RequestValidationErrorWithZod';
import { ServerErrorType } from '@/lib/errors/types';
import { isSimaError } from '@/lib/errors/utils';
import connectDB from '@/lib/mongo/mongodb';
import  { NextRequest,NextResponse, } from 'next/server'



export async function POST(request: NextRequest) {
  try{
    await connectDB();
    const formData = await request.formData()
    const result =  RegisterSchema.safeParse(formData);
    if(!result.success){
      throw new RequestValidationErrorWithZod(result.error);
    }
    const { firstName, lastName, email, password } = result.data;
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError(
        "Электронная почта уже используется",
        ServerErrorType.AuthUserAlreadyExists
      );
    }
    const user = new User({ firstName, lastName, email, password });
    await user.save();

    const response = NextResponse.json(user,{status:201})

        // Generate JWT
    const userJwt = jwtSignUser(user);

    // Store it on session object
    response.cookies.set(SESSION_CONFIG.name, userJwt, SESSION_CONFIG)
    return response




  } catch (error) {
    console.log('error', error)
    if(isSimaError(error)){

      return NextResponse.json({ error: error.serializeErrors()}, { status: error.statusCode })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
