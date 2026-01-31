"use client";

import React from "react";
import { Flex, Text } from "@radix-ui/themes";

const EmptyStateNoMessages: React.FC = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      style={{ flex: 1, padding: "var(--space-6)" }}
    >
      <svg
        width="120"
        height="80"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M20 20h50v30H20V20z"
          stroke="var(--gray-8)"
          strokeWidth="2"
          fill="var(--gray-3)"
          rx="4"
        />
        <path
          d="M50 35h50v30H50V35z"
          stroke="var(--accent-8)"
          strokeWidth="2"
          fill="var(--accent-2)"
          rx="4"
        />
        <circle cx="65" cy="50" r="3" fill="var(--accent-9)" />
        <circle cx="75" cy="50" r="3" fill="var(--accent-9)" />
        <circle cx="85" cy="50" r="3" fill="var(--accent-9)" />
      </svg>
      <Text size="3" color="gray">
        Пока нет сообщений
      </Text>
    </Flex>
  );
};

export default EmptyStateNoMessages;
