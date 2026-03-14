"use client";
import styled from "styled-components";
import { Box, Flex } from "@radix-ui/themes";

export const WelcomeWrapper = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  max-width: 560px;
  padding: var(--space-8) var(--space-6);
`;

export const WelcomeDivider = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: var(--gray-4);
`;
