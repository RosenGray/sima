"use client";

import { Box, Flex } from "@radix-ui/themes";
import styled from "styled-components";
import Link from "next/link";

export const FavoritesDropdownPanel = styled(Box)`
  min-width: 320px;
  max-height: 70vh;
  overflow-y: auto;
  padding: var(--space-2);
`;

export const FavoritesDropdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

export const FavoritesDropdownRowLink = styled(Link)`
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  padding: var(--space-2);
  border-radius: var(--radius-2);
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--gray-3);
  }
`;

export const FavoritesDropdownThumb = styled.div`
  position: relative;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: var(--radius-2);
  overflow: hidden;
  background: var(--gray-4);
`;

export const FavoritesDropdownText = styled(Flex)`
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: var(--space-1);
`;

export const FavoritesDropdownTitle = styled.span`
  font-size: var(--font-size-2);
  font-weight: 600;
  color: var(--gray-12);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FavoritesDropdownDescription = styled.span`
  font-size: var(--font-size-1);
  color: var(--gray-11);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
`;

export const FavoritesDropdownPrice = styled.span`
  font-size: var(--font-size-2);
  font-weight: 600;
  color: var(--gray-12);
`;

export const FavoritesDropdownFooter = styled(Flex)`
  margin-top: var(--space-2);
  padding-top: var(--space-2);
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-2);
`;

export const FavoritesDropdownButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-2);
  background: var(--accent-9);
  color: var(--gray-1);
  font-size: var(--font-size-2);
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--accent-10);
  }
`;
