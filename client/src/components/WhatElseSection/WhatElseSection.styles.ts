"use client";
import styled from "styled-components";
import { Box, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { breakpoints } from "@/globals";

export const SectionWrapper = styled(Box)`
  padding: var(--space-6) var(--space-4);
  max-width: 1200px;
  margin: 0 auto;
  background: var(--accent-2);
  border-top: 1px solid var(--gray-5);
  border-bottom: 1px solid var(--gray-5);
  margin-bottom: var(--space-6);
`;

export const InnerFlex = styled(Flex)`
  flex-direction: column;
  gap: var(--space-5);
`;

export const TabsWrapper = styled(Box)`
  width: 100%;
`;

export const LinksList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2);

  @media (min-width: ${breakpoints.xs}px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-2) var(--space-5);
  }
`;

export const LinkItem = styled.li`
  margin: 0;
  padding: 0;
`;

export const FlowLink = styled(Link)`
  color: var(--accent-11);
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: var(--accent-12);
    text-decoration: underline;
  }
`;
