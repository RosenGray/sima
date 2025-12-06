"use client";
import { breakpoints } from "@/globals";
import { Box } from "@radix-ui/themes";
import styled from "styled-components";

export const ModalFiltersSection = styled(Box)`
  border: 1px solid green;
`;

export const DesktopFiltersWrapper = styled(Box)`
  border: 1px solid blue;
  height: 100%;
  flex: 1;
  display: none;

  @media (min-width: ${breakpoints.sm - 1}px) {
    display: flex;
  }
`;

export const MobileFiltersWrapper = styled(Box)`
  background-color: red;
  height: 100%;
  display: flex;

  @media (min-width: ${breakpoints.sm}px) {
    display: none;
  }
`;
