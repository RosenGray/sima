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

export const SearchList = styled(Flex)`
  flex-direction: column;
  gap: var(--space-3);
`;

export const SearchCardRow = styled(Flex)`
  align-items: center;
  gap: var(--space-2);
  border-radius: var(--radius-3);
  padding: 0;
`;

export const SearchCardLink = styled(Link)`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  border-radius: var(--radius-3);
  padding: var(--space-3);
  text-decoration: none;
  color: inherit;
  transition: background 0.15s ease;

  &:hover {
    background: var(--gray-a3);
  }
`;

export const SearchInfo = styled(Flex)`
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
`;

export const SearchTitle = styled(Text)`
  font-size: var(--font-size-3);
  font-weight: 500;
  color: var(--gray-12);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SearchDate = styled(Text)`
  font-size: var(--font-size-1);
  color: var(--gray-10);
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
