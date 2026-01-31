"use client";
import styled from "styled-components";
import { Box } from "@radix-ui/themes";

export const PrivateZoneLayoutSection = styled.section`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &:before {
    content: "";
    display: block;
    height: var(--header-height);
    flex-shrink: 0;
  }
`;

export const PrivateZoneContentRow = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: row;
  min-height: 0;
`;

export const PrivateZoneSidebar = styled.aside`
  width: 240px;
  flex-shrink: 0;
  background: var(--gray-12);
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
`;

export const PrivateZoneMain = styled.main`
  flex: 1;
  min-width: 0;
  background: var(--yellow-4);
`;
