"use client";
import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";

export const CardWrapper = styled(Card)`
  width: 100%;
`;

export const CardInner = styled(Flex)`
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-1);
`;

export const TextBlock = styled(Box)`
  flex: 1;
  min-width: 0;
`;
