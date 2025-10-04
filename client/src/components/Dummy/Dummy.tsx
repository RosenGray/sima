// Client Component
'use client'
import { use } from 'react'

export default function Dummy({ posts }: { posts: Promise<unknown[]> }) {
  const allPosts = use(posts) // Unwrap the promise
  return <h1>Dummy</h1>
}