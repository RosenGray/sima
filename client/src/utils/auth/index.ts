import { jwtVerify } from "jose";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { useState } from "react";
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_KEY || "");

export async function validateSession(encodedToken: string): Promise<boolean> {
  try {
    const decodedString = Buffer.from(encodedToken, "base64").toString("utf-8");
    const { jwt } = JSON.parse(decodedString);
    const { payload } = await jwtVerify(jwt, SECRET_KEY);
    if (!payload || !payload.id || !payload.email) {
      return false;
    }

    return true;
  } catch (err) {
    console.error("Token validation failed:", err);
    return false;
  }
}


