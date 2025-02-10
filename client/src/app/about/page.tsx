import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import AboutContent from './about-content'
import { getPosts } from '../posts/_lib/actions'

export default async function AboutPage() {
  const queryClient = new QueryClient()

//   await queryClient.prefetchQuery({
//     queryKey: ['posts'],
//     queryFn: () => getPosts(),
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   })

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
      <AboutContent />
    // </HydrationBoundary>
  )
}
