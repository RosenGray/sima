"use client";
import styled from "styled-components";
import { Box } from "@radix-ui/themes";
import Link from "next/link";

export const CategoryLinksNav = styled.nav`
  display: flex;
  width: 100%;
  padding: var(--space-4) 0;
`;

export const CategoryLinksList = styled.ul`
  display: flex;

  gap: var(--space-5);
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

`;

export const CategoryLinksItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

export const CategoryLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }

  &:focus-visible {
    outline: 2px solid var(--accent-9);
    outline-offset: 2px;
    border-radius: var(--radius-3);
  }
`;

export const CategoryLinkImageWrapper = styled(Box)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: var(--gray-3);
  flex-shrink: 0;
`;

export const CategoryLinkIconWrapper = styled(Box)`
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: var(--gray-3);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CategoryLinkLabel = styled.span`
  text-align: center;
  font-size: var(--font-size-2);
  font-weight: 500;
  max-width: 150px;
  line-height: 1.3;
`;
