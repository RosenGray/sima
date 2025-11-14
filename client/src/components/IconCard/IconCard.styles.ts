"use client";
import styled from "styled-components";
import { Card, Flex } from "@radix-ui/themes";

export const IconCardContainer = styled(Card)<{ $isClickable?: boolean }>`
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: ${(props) => (props.$isClickable ? "pointer" : "default")};
  border: 1px solid var(--gray-6);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  padding: var(--space-4) var(--space-6);

  ${(props) =>
    props.$isClickable &&
    `
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-6);
      border-color: var(--accent-9);
    }

    &:active {
      transform: translateY(-2px);
    }
  `}
`;

export const IconCardContent = styled(Flex)`
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  justify-content: center;
  gap: var(--space-4);
`;

export const IconCardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-3);
  background: var(--accent-3);
  color: var(--accent-11);
  margin-bottom: var(--space-2);

  @media (min-width: 1024px) {
    width: 80px;
    height: 80px;
  }
`;

export const IconCardTitle = styled.div`
  margin-bottom: var(--space-2);
`;

export const IconCardDescription = styled.div`
  line-height: 1.6;
  max-width: 100%;
`;

