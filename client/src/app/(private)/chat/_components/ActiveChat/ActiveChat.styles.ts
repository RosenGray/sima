"use client";

import styled from "styled-components";
import { Box, Flex } from "@radix-ui/themes";

export const ActiveChatHeader = styled(Flex)`
  padding: var(--space-4);
  border-bottom: 1px solid var(--gray-6);
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
`;

export const ActiveChatHeaderInfo = styled(Flex)`
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
`;

export const ChatContextMenuTrigger = styled(Box)`
  position: relative;
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-2);
  &:hover {
    background: var(--gray-3);
  }
`;

export const ChatContextMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--space-1);
  min-width: 180px;
  background: var(--color-background);
  border: 1px solid var(--gray-6);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-5);
  padding: var(--space-2);
  z-index: 100;
`;

export const ChatContextMenuItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: none;
  background: transparent;
  border-radius: var(--radius-2);
  cursor: pointer;
  font-size: inherit;
  color: ${({ $danger }) => ($danger ? "var(--red-11)" : "var(--gray-12)")};
  &:hover {
    background: var(--gray-3);
  }
`;

export const AdSubHeader = styled(Flex)`
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--gray-6);
  flex-shrink: 0;
  align-items: center;
  gap: var(--space-3);
  background: var(--gray-2);
`;

export const AdSubHeaderThumb = styled(Box)`
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  overflow: hidden;
  background: var(--gray-4);
`;

export const AdSubHeaderContent = styled(Flex)`
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: var(--space-1);
`;

export const ChatBody = styled(Box)`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

export const MessageList = styled(Flex)`
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
`;

export const MessageBubble = styled(Box)<{ $isOwn: boolean }>`
  max-width: 75%;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-3);
  align-self: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
  background: ${({ $isOwn }) => ($isOwn ? "var(--accent-9)" : "var(--gray-4)")};
  color: ${({ $isOwn }) => ($isOwn ? "white" : "var(--gray-12)")};
`;

export const InputStripe = styled(Flex)`
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--gray-6);
  flex-shrink: 0;
  align-items: center;
  gap: var(--space-3);
  background: var(--color-background);
`;
