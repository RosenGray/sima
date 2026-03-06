"use client";

import styled from "styled-components";
import { Box, Flex, Text } from "@radix-ui/themes";

export const ChatListItemBox = styled(Box)<{ $active?: boolean }>`
  padding: var(--space-3);
  border-bottom: 1px solid var(--gray-5);
  cursor: pointer;
  transition: background 0.15s ease;
  background: ${({ $active }) => ($active ? "var(--gray-4)" : "transparent")};

  &:hover {
    background: var(--gray-3);
  }
`;

export const ChatListItemThumbnailWrap = styled(Box)<{ $ghost?: boolean }>`
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  overflow: hidden;
  background: var(--gray-4);

  ${({ $ghost }) =>
    $ghost &&
    `
    filter: grayscale(1);
    opacity: 0.7;
  `}
`;

export const ChatListItemContent = styled(Flex)`
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: var(--space-1);
`;

export const ChatListItemStatusMessage = styled(Text)`
  font-size: 11px;
  color: var(--gray-11);
  line-height: 1.2;
`;

