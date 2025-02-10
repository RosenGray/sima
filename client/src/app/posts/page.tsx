// app/posts/page.tsx
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
  } from '@tanstack/react-query'
  import Link from "next/link";
import { getPosts } from './_lib/actions'
import Posts from './_lib/posts'
  
  export default async function PostsPage() {
    const queryClient = new QueryClient()
  
    await queryClient.prefetchQuery({
      queryKey: ['posts'],
      queryFn: () => getPosts(),
      staleTime: 1000 * 60 * 5, // 5 minutes
    })
  
    return (
      // Neat! Serialization is now as easy as passing props.
      // HydrationBoundary is a Client Component, so hydration will happen there.
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Link href="/about">About</Link>
        <Posts />
      </HydrationBoundary>
    )
  }