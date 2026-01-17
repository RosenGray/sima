"use client";
import styled from "styled-components";
import { Container, Grid, Heading, Box } from "@radix-ui/themes";

export const Yad2PageContainer = styled(Container)`
  padding-bottom: 40px;
`;

export const Title = styled(Heading)``;

export const Yad2ItemGrid = styled(Grid)``;

export const StickyPaginationWrapper = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-background);
  padding: 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  backdrop-filter: blur(8px);
  border-top: 1px solid var(--gray-6);
  border-radius: 10px;
  max-width: calc(100% - 2em);
  margin: 0 auto;
`;
