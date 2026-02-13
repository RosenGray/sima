"use client";
import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";
import { breakpoints } from "@/globals";

export const FooterContainer = styled.footer`
  /* min-height: 400px;
  height: 400px; */
  background: var(--accent-2);
  border-top: 1px solid var(--gray-6);
  display: flex;
  align-items: stretch;
`;

export const FooterInner = styled(Flex)`
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
  gap: var(--space-6);
  flex-direction: column;

  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const FooterLeft = styled(Box)`
  flex-shrink: 0;
  width: 100%;

  @media (min-width: ${breakpoints.md}px) {
    width: 280px;
    min-width: 280px;
  }
`;

export const FooterRight = styled(Box)`
  flex: 1;
  min-width: 0;
`;

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
