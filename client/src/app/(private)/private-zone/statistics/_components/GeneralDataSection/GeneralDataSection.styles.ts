"use client";
import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";

export const SectionWrapper = styled(Box)`
  width: 100%;
`;

export const SectionHeader = styled(Flex)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
`;

export const InnerCard = styled(Card)`
  width: 100%;
`;

export const MetricRow = styled(Flex)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-2);
`;

export const MetricLabel = styled(Flex)`
  flex-direction: row;
  align-items: center;
  gap: var(--space-2);
`;

export const ColorDot = styled(Box)`
  width: 16px;
  height: 16px;
  border-radius: var(--radius-1);
  flex-shrink: 0;
`;

export const MetricCount = styled(Box)``;

export const MetricRowSeparator = styled(Box)`
  padding: 0 var(--space-2);
`;
