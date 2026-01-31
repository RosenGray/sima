"use client";
import styled from "styled-components";
import { Box, Flex } from "@radix-ui/themes";

export const SidebarInner = styled(Flex)`
  flex-direction: column;
  height: 100%;
  padding: var(--space-4);
  overflow-y: auto;
`;

export const SidebarUserBlock = styled(Flex)`
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
`;

export const SidebarUserName = styled.span`
  font-size: var(--font-size-4);
  font-weight: 600;
  /* gray-12: dark text on light sidebar (light theme), light text on dark sidebar (dark theme) */
  color: var(--gray-12);
  text-align: center;
`;

export const SidebarUserEmail = styled.span`
  font-size: var(--font-size-2);
  /* gray-11: readable on both light and dark sidebar */
  color: var(--gray-11);
  text-align: center;
`;

export const SidebarNavList = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
  min-height: 0;
`;

export const SidebarNavLink = styled(Flex)`
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-3);
  cursor: pointer;
  transition: background 0.2s ease;
  text-decoration: none;
  color: var(--gray-12);

  &:hover {
    background: var(--gray-a4);
  }
`;

export const SidebarNavLinkLabel = styled.span`
  font-size: var(--font-size-3);
  color: inherit;
`;

export const SidebarLogoutBlock = styled(Flex)`
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  margin-top: var(--space-4);
  border-top: 1px solid var(--gray-6);
  cursor: pointer;
  border-radius: var(--radius-3);
  transition: background 0.2s ease;
  color: var(--gray-12);

  &:hover {
    background: var(--gray-a4);
  }
`;

export const SidebarLogoutLabel = styled.span`
  font-size: var(--font-size-3);
  color: inherit;
`;
