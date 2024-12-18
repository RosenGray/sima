import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log("this is a middleware",request.url)
    return NextResponse.next();
}
 
export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
