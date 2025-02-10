"use client";

import { Container, Flex, Heading, Text, Button } from "@radix-ui/themes";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import styles from "./page.module.scss";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ reset, error }: ErrorProps) {
  return (
    <Container size="3" className={styles.errorPage}>
      <Flex direction="column" align="center" gap="4">
        <ExclamationTriangleIcon color="red" className={styles.icon} />
        <Heading size="8" className={styles.heading}>
          Упс! Что-то пошло не так
        </Heading>

        <Text size="4" className={styles.message}>
          Мы столкнулись с непредвиденной ошибкой. Пожалуйста, попробуйте еще
          раз
        </Text>

        <Flex gap="4" mt="4">
          <Button
            size="3"
            variant="soft"
            onClick={() => (window.location.href = "/")}
            className={styles.button}
          >
            вернуться домой
          </Button>

          <Button size="3" onClick={reset} className={styles.retryButton}>
            <ReloadIcon width="16" height="16" />
            Попробуйте еще раз
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
