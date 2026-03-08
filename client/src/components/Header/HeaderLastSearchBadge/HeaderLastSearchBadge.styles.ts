"use client";

import styled from "styled-components";
import { Box } from "@radix-ui/themes";

export const SearchBadgeWrapper = styled(Box)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const SearchBadgeCount = styled.span`
  position: absolute;
  top: -4px;
  right: -6px;
  min-width: 12px;
  height: 12px;
  padding: 0 2px;
  border-radius: 50%;
  background: var(--yellow-12);
  color: var(--gray-1);
  font-size: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;
