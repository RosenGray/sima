// Re-export the proxy function as the default middleware
export { proxy as middleware } from './src/proxy';

// Config must be directly exported in middleware.ts, not re-exported
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