"use client";
import styled from "styled-components";
import { Skeleton } from "@radix-ui/themes";
export const LoadingFilters = styled(Skeleton)`
  padding: var(--space-4);
  margin: 0 auto;
  border-radius: var(--radius-2);
  background: var(--accent-9);
  height: 60px;
`;
