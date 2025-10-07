// Client Component
'use client'

export default function Dummy({ posts }: { posts: unknown[] }) {
  return (
    <div>
      <h1>Dummy Component</h1>
      <p>Posts count: {posts.length}</p>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  )
}