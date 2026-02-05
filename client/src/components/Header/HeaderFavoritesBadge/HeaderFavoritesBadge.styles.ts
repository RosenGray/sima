"use client";

import { Box } from "@radix-ui/themes";
import styled from "styled-components";

export const FavoritesBadgeWrapper = styled(Box)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const FavoritesBadgeCount = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-9);
  color: var(--gray-1);
  font-size: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;
