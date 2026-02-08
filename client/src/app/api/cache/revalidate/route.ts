// import { revalidateTag } from 'next/cache';
// import { NextRequest, NextResponse } from 'next/server';

import { NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const tag = searchParams.get('tag');

//     if (!tag) {
//       return NextResponse.json(
//         { error: 'Tag parameter is required' },
//         { status: 400 }
//       );
//     }

//     // Revalidate the cache for the specified tag (Next.js 16+ requires profile; "max" = stale-while-revalidate)
//     revalidateTag(tag, 'max');

//     return NextResponse.json({
//       message: `Cache revalidated for tag: ${tag}`,
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error('Error revalidating cache:', error);
//     return NextResponse.json(
//       { error: 'Failed to revalidate cache' },
//       { status: 500 }
//     );
//   }
// }

// // Example usage:
// // POST /api/cache/revalidate?tag=service-categories
// // POST /api/cache/revalidate?tag=service-subcategories


export async function GET() {
  return NextResponse.json({ message: "Cache revalidated" });
}