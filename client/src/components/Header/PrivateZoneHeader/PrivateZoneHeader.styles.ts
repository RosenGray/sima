"use client";
import styled from "styled-components";
import { Button } from "@radix-ui/themes";
import { HeaderContainer, Logo, ActionsContainer } from "../Header.styles";

export const PrivateZoneHeaderContainer = styled(HeaderContainer)`
  min-height: var(--simple-header-height);
`;

export const PrivateZoneHeaderTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4rem;
  flex-shrink: 0;
  width: 100%;
`;

export const PrivateZoneHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 0;
`;

export const PrivateZoneTitle = styled.span`
  font-size: var(--font-size-4);
  font-weight: 600;
  color: var(--gray-12);
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: var(--font-size-3);
  }
`;

export const PrivateZoneActionsContainer = styled(ActionsContainer)``;

export const PrivateZonePublishAdButton = styled(Button)`
  border-radius: var(--radius-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: var(--accent-10);
  }
`;

export const PrivateZoneUserAvatar = styled(Button)`
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  font-weight: 600;
  text-transform: uppercase;

  &:hover {
    background: var(--gray-4);
  }
`;
