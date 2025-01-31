import { User } from "@/types/auth/auth.types";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_KEY || process.env.NEXT_PUBLIC_JWT_KEY || ""
);

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

export async function isAuthenticated() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("sima-auth-session");
  return !!authCookie;
}

export async function getUserData(): Promise<User | null> {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("sima-auth-session");

  if (!authCookie || !validateSession(authCookie.value)) return null;

  try {
    const decodedString = Buffer.from(authCookie.value, "base64").toString(
      "utf-8"
    );
    const { jwt } = JSON.parse(decodedString);
    const { payload } = await jwtVerify<User>(jwt, SECRET_KEY);
    if (!payload || !payload.id || !payload.email) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
