"use client";

import { useEffect } from "react";
import { Flex } from "@radix-ui/themes";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  ErrorPageContainer,
  GoBackButton,
  Message,
  RetryButton,
  StyledHeading,
} from "./error.styles";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const STALE_DEPLOYMENT_RELOAD_KEY = "sima-stale-deployment-reload";

export default function ErrorPage({ reset, error }: ErrorProps) {
  useEffect(() => {
    // Detect stale deployment errors (old client JS calling new server build).
    // Auto-refresh once so the browser fetches the latest JS bundle.
    const isStaleDeployment =
      error.message?.includes("Failed to find Server Action") ||
      error.digest?.includes("NEXT_NOT_FOUND");

    if (isStaleDeployment && !sessionStorage.getItem(STALE_DEPLOYMENT_RELOAD_KEY)) {
      sessionStorage.setItem(STALE_DEPLOYMENT_RELOAD_KEY, "1");
      window.location.reload();
      return;
    }

    // Clear the flag after a successful render (error was not stale-deployment,
    // or this is the second attempt and the reload already happened).
    sessionStorage.removeItem(STALE_DEPLOYMENT_RELOAD_KEY);
  }, [error]);

  return (
    <ErrorPageContainer size="3">
      <Flex direction="column" align="center" gap="4">
        <ExclamationTriangleIcon
          color="red"
          style={{ width: 40, height: 40 }}
        />
        <StyledHeading as="h1" size="8">
          Упс! Что-то пошло не так
        </StyledHeading>

        <Message size="4">
          Мы столкнулись с непредвиденной ошибкой. Пожалуйста, попробуйте еще
          раз
        </Message>

        <Flex gap="4" mt="4">
          <GoBackButton
            size="3"
            variant="soft"
            onClick={() => (window.location.href = "/")}
          >
            вернуться домой
          </GoBackButton>

          <RetryButton size="3" onClick={reset}>
            <ReloadIcon width="16" height="16" />
            Попробуйте еще раз
          </RetryButton>
        </Flex>
      </Flex>
    </ErrorPageContainer>
  );
}
