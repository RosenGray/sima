import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import AboutContent from './about-content'
import { getPosts } from '../posts/_lib/actions'
import Link from 'next/link'
import { getProfessionals } from '../(private)/publish-ad/professionals/_lib/actions'
import { DummyAllClient } from '../(private)/professionals/all/DummyAllClient/DummyAllClient'
import { getQueryClient } from '../get-query-client'
export default  function AboutPage() {
  const queryClient = getQueryClient();
  queryClient.fetchQuery({
    queryKey: ["getProfessionals"],
    queryFn: getProfessionals,
    staleTime: 1000 * 60 * 5, // 5 min
  });

//   await queryClient.prefetchQuery({
//     queryKey: ['posts'],
//     queryFn: () => getPosts(),
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   })

  return (
    <div>
      <h1>About Page</h1>
      <Link href="/professionals/all">Professionals</Link>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DummyAllClient />
      </HydrationBoundary>
    </div>
    // <HydrationBoundary state={dehydrate(queryClient)}>
      // <AboutContent />
    // </HydrationBoundary>
  )
}
