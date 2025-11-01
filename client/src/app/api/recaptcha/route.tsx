// // app/api/hello/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { token } = data;
  const secretKey: string | undefined = process.env.RECAPTCHA_SECRET_KEY;
  console.log(secretKey);

  if (!token) {
    return NextResponse.json({ message: "Token not found" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      {
        method: "POST",
        headers: {
          //application/x-www-form-urlencoded
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ).then((res) => res.json());
    //  return NextResponse.json(
    //   { response: response, message: `RECAPTCHA_SECRET_KEY: ${process.env.RECAPTCHA_SECRET_KEY}`,token: token },
    //   { status: 200 }
    // );

    if (response.success) {
      return NextResponse.json(
        { message: "Success", success: response.success },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to verify", success: response.success },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: `RECAPTCHA_SECRET_KEY: ${process.env.RECAPTCHA_SECRET_KEY}` },
    { status: 200 }
  );
}

// export async function GET() {
//   return Response.json({ message: 'Auth API is running' })
// }
