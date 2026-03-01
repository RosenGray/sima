"use client";

import styled from "styled-components";
import { Box, Flex } from "@radix-ui/themes";

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

export const ChatListItemThumbnailWrap = styled(Box)`
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  overflow: hidden;
  background: var(--gray-4);
`;

export const ChatListItemRemovedBadge = styled(Flex)`
  position: absolute;
  top: 2px;
  right: 2px;
  background: var(--red-9);
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: var(--radius-1);
`;

export const ChatListItemContent = styled(Flex)`
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: var(--space-1);
`;
