import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateSession } from "./utils/auth";

export async function middleware(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("sima-auth-session");
    const isSessionValid =
      sessionCookie && (await validateSession(sessionCookie.value));

    if (!isSessionValid) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Add custom header to indicate session status
    const response = NextResponse.next();
    response.headers.set("X-Session-Status", "valid");
    response.headers.set("Cookie", `sima-auth-session=${sessionCookie.value}`);

    return response;
  } catch (err) {
    console.error("Middleware error:", err);

    // Optionally add a header for debugging errors
    const errorResponse = NextResponse.next();
    errorResponse.headers.set("X-Session-Status", "error");
    return errorResponse;
  }
}

// Apply middleware to all routes
export const config = {
  matcher: ["/about/:path*"],
  //  runtime:"nodejs",
  // matcher: ["/about/:path*"], // Routes that require authentication
  // matcher: '/:path*', // Match all routes
  ////   matcher: ["/protected/:path*"], // Routes that require authentication
};
