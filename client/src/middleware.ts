import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
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
  "/auth/register",
  "/auth/reset-password",
  "/auth/verify-reset-token",
  "/about",
  "/api/auth",
  "/api/files",
];

// Define routes that should redirect authenticated users away
const authRoutes = ["/login", "/register", "/auth/login", "/auth/register"];

export function middleware(request: NextRequest) {
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
      jwt.verify(token, process.env.JWT_KEY!);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch {
      // Token is invalid, continue to auth page
      return NextResponse.next();
    }
  }

  // If it's a protected route, check authentication
  if (isProtectedRoute) {
    if (!token) {
      // No token, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      // Verify the token
      jwt.verify(token, process.env.JWT_KEY!);
      return NextResponse.next();
    } catch {
      // Token is invalid, redirect to login
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
      // Clear the invalid token
      response.cookies.delete(SIMA_AUTH_SESSION_CONFIG.name);
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
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
