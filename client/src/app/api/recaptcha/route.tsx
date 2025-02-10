// app/api/hello/route.ts
import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {  
  const data = await req.json();
  const { token } = data;
  const secretKey: string | undefined = process.env.RECAPTCHA_SECRET_KEY;

  if (!token) {
    return NextResponse.json(
      { message: "Token not found" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );

    if (response.data.success) {
      return NextResponse.json(
        { message: "Success" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to verify" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}