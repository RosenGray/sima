"use client";

import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";
import { breakpoints } from "@/globals";

export const ChatPageContainer = styled(Box)`
  padding: var(--space-4);
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;


  @media (min-width: ${breakpoints.md}px) {
    padding: var(--space-6);
  }
`;

export const ChatLayoutCard = styled(Card)`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 600px;
  height: 100%;
  overflow: hidden;
  border-radius: var(--radius-4);
  box-shadow: var(--shadow-4);


  @media (max-width: ${breakpoints.md - 1}px) {
    flex-direction: column;
    min-height: 500px;
  }
`;

export const ChatListPanel = styled(Box)<{ $hideOnMobile: boolean }>`
  width: 100%;
  max-width: 360px;
  min-width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--gray-6);
  background: var(--gray-2);

  @media (max-width: ${breakpoints.md - 1}px) {
    max-width: none;
    min-height: 200px;
    display: ${({ $hideOnMobile }) => ($hideOnMobile ? "none" : "flex")};
    border-right: none;
    border-bottom: 1px solid var(--gray-6);
  }
`;

export const ActiveChatPanel = styled(Box)<{ $hideOnMobile: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: var(--color-background);

  @media (max-width: ${breakpoints.md - 1}px) {
    display: ${({ $hideOnMobile }) => ($hideOnMobile ? "none" : "flex")};
    min-height: 400px;
  }
`;

export const ChatListHeader = styled(Flex)`
  padding: var(--space-4);
  border-bottom: 1px solid var(--gray-6);
  flex-shrink: 0;
`;

export const ChatListScroll = styled(Box)`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

export const PlaceholderPanel = styled(Flex)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background: var(--gray-2);
  color: var(--gray-11);
`;

export const ChatBackBar = styled(Flex)`
  padding: var(--space-2) var(--space-4);
  border-bottom: 1px solid var(--gray-6);
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
  display: none;

  @media (max-width: ${breakpoints.md - 1}px) {
    display: flex;
  }
`;
