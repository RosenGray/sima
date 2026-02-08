// import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

// // Security: Check for authorization token in production
// function isAuthorized(request: NextRequest): boolean {
//   // In development, allow all requests
//   if (process.env.NODE_ENV === 'development') {
//     return true;
//   }

//   // In production, check for authorization header or secret token
//   const authHeader = request.headers.get('authorization');
//   const secretToken = process.env.REVALIDATE_SECRET_TOKEN;

//   if (!secretToken) {
//     console.warn('REVALIDATE_SECRET_TOKEN not set in production!');
//     return false;
//   }

//   return authHeader === `Bearer ${secretToken}`;
// }

// export async function POST(request: NextRequest) {
//   try {
//     // Check authorization
//     if (!isAuthorized(request)) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();
//     const { tags } = body;

//     if (!tags || !Array.isArray(tags)) {
//       return NextResponse.json(
//         { error: 'tags array is required' },
//         { status: 400 }
//       );
//     }

//     // Revalidate each tag
//     tags.forEach((tag: string) => {
//       revalidateTag(tag);
//     });

//     return NextResponse.json({
//       revalidated: true,
//       tags,
//       now: Date.now(),
//       environment: process.env.NODE_ENV,
//     });
//   } catch (error) {
//     console.error('Error revalidating cache:', error);
//     return NextResponse.json(
//       { error: 'Error revalidating cache' },
//       { status: 500 }
//     );
//   }
// }

// // GET endpoint to clear all service-related caches at once
// export async function GET(request: NextRequest) {
//   try {
//     // Check authorization
//     if (!isAuthorized(request)) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     revalidateTag('service-categories');
//     revalidateTag('service-subcategories');

//     return NextResponse.json({
//       revalidated: true,
//       tags: ['service-categories', 'service-subcategories'],
//       message: 'All service caches cleared',
//       now: Date.now(),
//       environment: process.env.NODE_ENV,
//     });
//   } catch (error) {
//     console.error('Error revalidating cache:', error);
//     return NextResponse.json(
//       { error: 'Error revalidating cache' },
//       { status: 500 }
//     );
//   }
// }

// // curl -X GET https://your-domain.com/api/revalidate-cache \
// //   -H "Authorization: Bearer YOUR_SECRET_TOKEN"

// make dummy helllo world api endpoint
export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}