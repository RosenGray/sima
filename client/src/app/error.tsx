// 'use client'

// import { FC, useEffect } from "react";

// type NextError = Error & { digest?: string }

// interface ErrorPageExampleProps {
//     error:NextError
//     reset:() => void
// }

// const ErrorPageExample:FC<ErrorPageExampleProps> = ({error,reset}) => {
//     useEffect(() => {
//         // Log the error to an error reporting service
//         console.error(error)
//       }, [error])

//       return (
//         <div>
//           <h2>Something went wrong!</h2>
//           <button
//             onClick={
//               // Attempt to recover by trying to re-render the segment
//               () => reset()
//             }
//           >
//             Try again
//           </button>
//         </div>
//       )
//   };

//   export default ErrorPageExample;
//          {error.message || "We encountered an unexpected error. Please try again."}
"use client";

// error.tsx
import { Container, Flex, Heading, Text, Button } from "@radix-ui/themes";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import styles from "./page.module.scss";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (

        <Container size="3" className={styles.errorPage}>
          <Flex direction="column" align="center" gap="4">
            <div className={styles.iconWrapper}>
              <ExclamationTriangleIcon className={styles.icon} />
            </div>

            <Heading size="8" className={styles.heading}>
              Oops! Something went wrong
            </Heading>

            <Text size="4" className={styles.message}>
              We encountered an unexpected error. Please try again
            </Text>

            <Flex gap="4" mt="4">
              <Button
                size="3"
                variant="soft"
                onClick={() => (window.location.href = "/")}
                className={styles.button}
              >
                Go Home
              </Button>

              <Button size="3" onClick={reset} className={styles.retryButton}>
                <ReloadIcon width="16" height="16" />
                Try Again
              </Button>
            </Flex>
          </Flex>
        </Container>
  );
}
