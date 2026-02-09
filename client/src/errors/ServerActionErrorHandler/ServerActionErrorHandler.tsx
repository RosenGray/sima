// app/components/ServerActionErrorBoundary.tsx
'use client'

import { useEffect } from 'react'

const ServerActionErrorBoundary = ({
  children,
}: {
  children: React.ReactNode
}) => {
  useEffect(() => {
    // Listen for unhandled promise rejections (Server Action errors)
    const handleRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason
      console.log('error', error)
      console.log('error message', error?.message)
      console.log('error digest', error?.digest)

      // Check if it's a Server Action error
      if (
        error?.message?.includes('Failed to find Server Action') ||
        error?.message?.includes('was not found on the server') ||
        error?.digest?.includes('NEXT_NOT_FOUND')
      ) {
        console.log('Detected stale client bundle, reloading page...')
        
        // Show a brief message before reload (optional)
        event.preventDefault() // Prevent console error
        
        // Reload the page to get fresh client bundle
        window.location.reload()
      }
    }

    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])

  return <>{children}</>
}

export default ServerActionErrorBoundary