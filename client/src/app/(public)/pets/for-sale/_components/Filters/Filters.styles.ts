"use client";
import { breakpoints } from "@/globals";
import { Box } from "@radix-ui/themes";
import styled from "styled-components";

export const ModalFiltersSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DesktopFiltersWrapper = styled(Box)`
  height: 100%;
  flex: 1;
  display: none;
  padding: var(--space-3);
  overflow-x: hidden;

  @media (min-width: ${breakpoints.sm - 1}px) {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

export const FiltersSection = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
  align-items: center;
  min-width: 0;
`;

export const ButtonsSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
  align-items: stretch;
`;

export const MobileFiltersWrapper = styled(Box)`
  flex: 1;
  padding-bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:after{
    content: '';
    display: block;
    width: 100%;
    height: 50px;
    background:transparent;
  }
  @media (min-width: ${breakpoints.sm}px) {
    display: none;
  }
`;

export const MobileFiltersContent = styled(Box)`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: var(--space-3);
  gap: 10px;

`;

export const MobileFilterFooter = styled(Box)`
  position: absolute;
  height: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid var(--gray-6);
  margin-bottom: 0;
  background: var(--color-background);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
