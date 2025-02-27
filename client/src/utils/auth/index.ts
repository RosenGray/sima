import { User } from "@/types/auth/auth.types";
import { jwtVerify } from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_KEY || process.env.NEXT_PUBLIC_JWT_KEY || ""
);

export const getSimaAuthSessionFromSimaSession = (
  simaSession: RequestCookie
) => {
  const sessionString = Buffer.from(simaSession.value, "base64").toString(
    "utf8"
  );
  const sessionData = JSON.parse(sessionString) as { simaAuthSession?: string };
  if (!sessionData.simaAuthSession) {
    return null;
  }
  return sessionData.simaAuthSession as string;
};

export async function validateSimaAuthSession(
  decodedToken: string
): Promise<{ isSessionValid: boolean; user: User | null }> {
  try {
    const { payload } = await jwtVerify<User>(decodedToken, SECRET_KEY);
    if (!payload || !payload.id || !payload.email) {
      return {
        isSessionValid: false,
        user: null,
      };
    }

    return {
      isSessionValid: true,
      user: payload,
    };
  } catch (err) {
    console.error("Token validation failed:", err);
    return {
      isSessionValid: false,
      user: null,
    };
  }
}

export async function getUserSessionData() {
  const cookieStore = cookies();
  const simaSessionCookie = cookieStore.get("sima-session");
  if (!simaSessionCookie || !simaSessionCookie.value) return null;
  const simaAuthSession = getSimaAuthSessionFromSimaSession(simaSessionCookie);
  if (!simaAuthSession) return null;
  const userSession = await validateSimaAuthSession(simaAuthSession);
  return userSession;
}
