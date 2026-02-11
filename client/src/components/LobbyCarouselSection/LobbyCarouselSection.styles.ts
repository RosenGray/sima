"use client";
import styled from "styled-components";
import { Box, Flex, Heading } from "@radix-ui/themes";

export const SectionWrapper = styled(Box)`
  padding: var(--space-4) 0;
`;

export const SectionHeader = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4);
  margin-bottom: var(--space-2);
`;

export const SectionTitle = styled(Heading)`
  margin: 0;
`;

export const SeeAllLink = styled.a`
  font-size: var(--font-size-2);
  font-weight: 500;
  color: var(--accent-11);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s ease;

  &:hover {
    color: var(--accent-12);
    text-decoration: underline;
  }
`;
