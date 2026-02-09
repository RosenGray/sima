"use client";

import { Card, Heading, Text } from "@radix-ui/themes";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.25s ease-out;
  padding: var(--space-4);
`;

export const OverlayCard = styled(Card)`
  max-width: 440px;
  width: 100%;
  padding: var(--space-7) var(--space-6);
  border-radius: var(--radius-4);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.3s ease-out;
  text-align: center;
`;

export const StyledHeading = styled(Heading)`
  color: var(--gray-12);
`;

export const Message = styled(Text)`
  color: var(--gray-11);
  line-height: 1.6;
  max-width: 360px;
`;

