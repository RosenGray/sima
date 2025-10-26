"use client";
import styled from "styled-components";
import { Box, Skeleton } from "@radix-ui/themes";

export const LoadingFilters = styled(Skeleton)`
  padding: var(--space-4);
  margin: 0 auto;
  border-radius: var(--radius-2);
  background: var(--accent-9);
  height: 60px;
`;

export const FiltersContainer = styled(Box)`
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 24px;
  background: var(--accent-1);
  border: 1px solid var(--gray-6);
  border-radius: var(--radius-3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;


  &:hover {
    border-color: var(--gray-7);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const SearchSection = styled.div`
  flex: 0 0 400px;
  min-width: 300px;
`;

export const FiltersSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  flex: 1;
  align-items: center;
`;