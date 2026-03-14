"use client";
import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { breakpoints } from "@/globals";

export const ContactCard = styled(Card)`
  padding: var(--space-5);
  background: var(--accent-1);
  border: 1px solid var(--gray-6);
  border-radius: var(--radius-4);
  box-shadow: var(--shadow-2);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: var(--gray-7);
    box-shadow: var(--shadow-3);
  }
`;

export const SectionWrapper = styled(Box)`
  padding: var(--space-6) var(--space-4);
  /* max-width: 1200px; */
  margin: 0 auto;
  background: var(--accent-2);
  border-top: 1px solid var(--gray-5);
  border-bottom: 1px solid var(--gray-5);
  border:1px solid blue;
  /* margin-bottom: var(--space-6); */
`;

export const SectionInner = styled(Flex)`
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  gap: var(--space-6);
  flex-direction: column;

  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const SectionLeft = styled(Box)`
  flex-shrink: 0;
  width: 100%;

  @media (min-width: ${breakpoints.md}px) {
    width: 280px;
    min-width: 280px;
  }
`;

export const SectionRight = styled(Box)`
  flex: 1;
  min-width: 0;
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
