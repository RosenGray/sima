"use client";

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

export default function ErrorPage({ reset, error }: ErrorProps) {
  console.log('error bla', error)
  console.log('error message', error.message)

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
