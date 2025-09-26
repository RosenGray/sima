
import { NextResponse } from "next/server";
export async function GET() {
    //todo: add auth check
  return NextResponse.json({ env: process.env });
}
