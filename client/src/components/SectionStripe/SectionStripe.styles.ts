"use client";
import { Box } from "@radix-ui/themes";
import styled from "styled-components";

/** Container for Next.js Image stripe: relative, configurable height, full width for fill + object-fit */
export const SectionStripeContainer = styled(Box)<{ $height?: number }>`
  position: relative;
  width: 100%;
  height: ${({ $height = 270 }) => $height}px;
  overflow: hidden;
`;
