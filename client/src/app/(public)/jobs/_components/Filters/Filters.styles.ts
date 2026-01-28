"use client";
import { Box } from "@radix-ui/themes";
import styled from "styled-components";
import { breakpoints } from "@/globals";

export const DesktopFiltersWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: ${breakpoints.sm - 1}px) {
    display: none;
  }
`;

export const FiltersSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  flex: 1;
  align-items: center;
`;

export const ButtonsSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
  align-items: stretch;
`;
