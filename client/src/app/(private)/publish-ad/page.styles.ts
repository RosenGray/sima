"use client";
import styled from "styled-components";
import { Container, Card, Flex, Grid } from "@radix-ui/themes";

export const PublishAdPageContainer = styled(Container)`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);

  @media (min-width: 768px) {
    padding: var(--space-8) var(--space-6);
  }
`;

export const PublishAdGrid = styled(Grid)``;

export const PublishAdCard = styled(Card)`
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  border: 1px solid var(--gray-6);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  padding: var(--space-4) var(--space-6);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-6);
    border-color: var(--accent-9);
  }

  &:active {
    transform: translateY(-2px);
  }


`;

export const PublishAdCardContent = styled(Flex)`
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  justify-content: center;
  gap: var(--space-4);


`;

export const PublishAdCardIcon = styled.div`
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

export const PublishAdCardTitle = styled.div`
  margin-bottom: var(--space-2);
`;

export const PublishAdCardDescription = styled.div`
  line-height: 1.6;
  max-width: 100%;
`;

