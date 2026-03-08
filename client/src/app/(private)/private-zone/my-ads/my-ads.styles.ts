"use client";
import styled from "styled-components";
import Link from "next/link";
import { Box, Flex, Text } from "@radix-ui/themes";

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

export const AdList = styled(Flex)`
  flex-direction: column;
  gap: var(--space-3);
`;

export const AdRow = styled(Flex)`
  align-items: center;
  gap: var(--space-3);
  border-radius: var(--radius-3);
  padding: var(--space-3);
  border: 1px solid var(--gray-6);
  background: var(--color-surface);
  flex-wrap: wrap;
`;

export const AdRowThumb = styled(Box)`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: var(--radius-2);
  overflow: hidden;
  position: relative;
  background: var(--gray-3);
`;

export const AdRowContent = styled(Flex)`
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: var(--space-1);
`;

export const AdRowTitle = styled(Text)`
  font-size: var(--font-size-3);
  font-weight: 500;
  color: var(--gray-12);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AdRowMeta = styled(Flex)`
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
`;

export const AdRowDate = styled(Text)`
  font-size: var(--font-size-1);
  color: var(--gray-10);
`;

export const AdDetailLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  flex: 1;
  min-width: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const EmptyState = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-8) var(--space-4);
  color: var(--gray-10);
  text-align: center;
`;

export const EmptyStateText = styled(Text)`
  font-size: var(--font-size-3);
  color: var(--gray-10);
`;

export const TabsWrapper = styled(Flex)`
  gap: var(--space-2);
  margin-bottom: var(--space-5);
  flex-wrap: wrap;
`;
