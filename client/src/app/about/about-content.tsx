// app/about/about-content.tsx
'use client'

// import { useQuery } from '@tanstack/react-query'
// import { getPosts } from '../posts/_lib/actions'
import ReCAPTCHA from '@/components/GoogleReCAPTCHA/GoogleReCAPTCHA'

export default function AboutContent() {
  // const { data: posts } = useQuery({ 
  //   queryKey: ['posts'], 
  //   queryFn: () => getPosts(),
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  // })
  
  return (
    <div>
      <h1>About Page</h1>
      <div>
        <ReCAPTCHA/>
      </div>
    </div>
  )
}