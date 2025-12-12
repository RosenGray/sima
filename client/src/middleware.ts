import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SIMA_AUTH_SESSION_CONFIG } from "@/lib/auth/config";

// Define routes that should be protected
const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/settings",
  "/admin",
  "/api/protected",
  "/publish-ad",
];

// Define routes that should be accessible without authentication
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/auth/login",
  "/auth/reset-password",
  "/auth/verify-reset-token",
  "/about",
  "/api/auth",
  "/api/files",
];

// Define routes that should redirect authenticated users away
const authRoutes = ["/login", "/register", "/auth/login", "/auth/register"];

// Helper function to get JWT secret as Uint8Array
const getJwtSecret = () => {
  const secret = process.env.JWT_KEY;
  if (!secret) {
    throw new Error("JWT_KEY is not defined");
  }
  return new TextEncoder().encode(secret);
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the JWT token from cookies
  const token = request.cookies.get(SIMA_AUTH_SESSION_CONFIG.name)?.value;

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Check if the current route is an auth route (login/register)
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If it's a public route and not protected, allow access
  if (isPublicRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  // If it's an auth route and user is authenticated, redirect to dashboard
  if (isAuthRoute && token) {
    try {
      // Verify the token to ensure it's valid
      await jwtVerify(token, getJwtSecret());
      return NextResponse.redirect(new URL("/404", request.url));
    } catch {
      // Token is invalid, continue to auth page
      return NextResponse.next();
    }
  }

  // If it's a protected route, check authentication
  if (isProtectedRoute) {
    if (!token) {
      // No token, redirect to login with redirectTo parameter
      const fullPath = request.nextUrl.pathname + request.nextUrl.search;
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirectTo", fullPath);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify the token
      await jwtVerify(token, getJwtSecret());
      return NextResponse.next();
    } catch {
      // Token is invalid, redirect to login with redirectTo parameter
      const fullPath = request.nextUrl.pathname + request.nextUrl.search;
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirectTo", fullPath);
      const response = NextResponse.redirect(loginUrl);
      // Clear the invalid token
      response.cookies.set(SIMA_AUTH_SESSION_CONFIG.name, "", {
        domain: SIMA_AUTH_SESSION_CONFIG.domain,
        path: "/",
        maxAge: 0
      });
      return response;
    }
  }

  // For any other route, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - .well-known (Chrome DevTools and other system requests)
     */
    "/((?!_next/static|_next/image|favicon.ico|public/|\\.well-known/).*)",
  ],
};
