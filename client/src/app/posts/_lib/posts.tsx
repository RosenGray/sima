// app/posts/posts.tsx
'use client'

import { useQuery } from "@tanstack/react-query"
import { getComments, getPosts } from "./actions"

export default function Posts() {
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix.
  const { data: commentsData } = useQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments,
    staleTime: 1000 * 60 * 5,
  })

  console.log("data", data);
  console.log("commentsData", commentsData);

  return <h1>Posts</h1>
}
