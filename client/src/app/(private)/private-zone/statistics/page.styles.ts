"use client";
import styled from "styled-components";
import { Box, Flex, Text } from "@radix-ui/themes";
import { breakpoints } from "@/globals";

export const PageWrapper = styled(Box)`
  padding: var(--space-6);
  width: 100%;
`;

export const PageTitle = styled(Text)`
  display: block;
  font-size: var(--font-size-6);
  font-weight: 700;
  color: var(--gray-12);
  margin-bottom: var(--space-5);
`;

export const TwoColumnLayout = styled(Flex)`
  flex-direction: row;
  gap: var(--space-4);
  align-items: flex-start;

  @media (max-width: ${breakpoints.md - 1}px) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled(Box)`
  width: 300px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.md - 1}px) {
    width: 100%;
  }
`;

export const RightColumn = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  min-width: 0;
`;
