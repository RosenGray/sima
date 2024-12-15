'use client'

import { FC, useEffect } from "react";

type NextError = Error & { digest?: string }

interface ErrorPageExampleProps {
    error:NextError
    reset:() => void
}

const ErrorPageExample:FC<ErrorPageExampleProps> = ({error,reset}) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
      }, [error])
     
      return (
        <div>
          <h2>Something went wrong!</h2>
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
        </div>
      )
  };
  
  export default ErrorPageExample;
  