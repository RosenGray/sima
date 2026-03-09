"use client";
import styled from "styled-components";
import { Box } from "@radix-ui/themes";
import { breakpoints } from "@/globals";

export const PrivateZoneLayoutSection = styled.section`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &:before {
    content: "";
    display: block;
    height: var(--simple-header-height);
    flex-shrink: 0;
  }
`;

export const PrivateZoneContentRow = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: row;
  min-height: 0;
  overflow: hidden;
`;

export const PrivateZoneSidebar = styled.aside<{ $collapsed?: boolean }>`
  flex-shrink: 0;
  border-right: 1px solid var(--gray-6);
  background: var(--accent-1);
  display: none;
  overflow: hidden;
  transition:
    width 0.2s ease,
    min-width 0.2s ease;

  @media (min-width: ${breakpoints.sm}px) {
    display: flex;
    flex-direction: column;
    min-height: 0;
    width: ${({ $collapsed }) => ($collapsed ? 0 : 240)}px;
    min-width: ${({ $collapsed }) => ($collapsed ? 0 : 240)}px;
    border-right-width: ${({ $collapsed }) => ($collapsed ? 0 : 1)}px;
  }
`;

export const SidebarToggleStrip = styled(Box)`
  flex-shrink: 0;
  width: 40px;
  min-width: 40px;
  border-right: 1px solid var(--gray-6);
  background: var(--accent-1);
  display: none;
  align-items: center;
  justify-content: center;

  @media (min-width: ${breakpoints.sm}px) {
    display: flex;
  }
`;

export const PrivateZoneMain = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  overflow-y: auto;
`;
