"use client";
import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";
import { breakpoints } from "@/globals";

export const SummaryCard = styled(Card)`
  width: 100%;
`;

export const StatsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: var(--space-2);

  @media (max-width: ${breakpoints.md - 1}px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const MetricCell = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding: var(--space-4) var(--space-3);
  text-align: center;
  position: relative;
`;

export const MetricDivider = styled(Box)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 40px;
  display: flex;
  align-items: center;

  @media (max-width: ${breakpoints.md - 1}px) {
    display: none;
  }
`;
