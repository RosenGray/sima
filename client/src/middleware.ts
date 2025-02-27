import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getSimaAuthSessionFromSimaSession,
  validateSimaAuthSession,
} from "./utils/auth";

export async function middleware(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("sima-session");

    if (!sessionCookie) {
      throw new Error("No session cookie found");
    }

    const simaAuthSession = getSimaAuthSessionFromSimaSession(sessionCookie);

    if (!simaAuthSession) {
      throw new Error("Invalid session format");
    }

    const isSessionValid =
      sessionCookie && (await validateSimaAuthSession(simaAuthSession)).isSessionValid;


    if (!isSessionValid) {
      throw new Error("Invalid or expired session");
    }

    // // Add custom header to indicate session status
    const response = NextResponse.next();
    response.headers.set("X-Session-Status", "valid");
    response.headers.set("Cookie", `sima-session=${sessionCookie.value}`);

    return response;
  } catch (err) {
    console.error("Middleware error:", err);
    // // Optionally add a header for debugging errors
    const errorResponse = NextResponse.next();
    errorResponse.headers.set("X-Session-Status", "error");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// Apply middleware to all routes
export const config = {
  // matcher: [],
  matcher: ["/about/:path*"],
  //  runtime:"nodejs",
  // matcher: ["/about/:path*"], // Routes that require authentication
  // matcher: '/:path*', // Match all routes
  ////   matcher: ["/protected/:path*"], // Routes that require authentication
};
