"use client";
import styled from "styled-components";
import { Skeleton, Card, Flex } from "@radix-ui/themes";

export const LoadingContainer = styled.div`
  padding: var(--space-4);
  max-width: 1200px;
  margin: 0 auto;
`;

export const LoadingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-4);
  width: 100%;
`;

export const LoadingCard = styled(Card)`
  padding: var(--space-4);
  background: var(--color-surface);
  border-radius: var(--radius-3);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--accent-8);
    box-shadow: 0 4px 12px var(--accent-4);
  }
`;

export const CardImage = styled(Skeleton)`
  width: 100%;
  height: 200px;
  border-radius: var(--radius-2);
  margin-bottom: var(--space-3);
  background: var(--accent-7);
`;

export const CardTitle = styled(Skeleton)`
  width: 80%;
  height: 1.5rem;
  margin-bottom: var(--space-2);
  border-radius: var(--radius-1);
  background: var(--accent-7);
`;

export const CardDescription = styled(Skeleton)`
  width: 100%;
  height: 1rem;
  margin-bottom: var(--space-1);
  border-radius: var(--radius-1);
  background: var(--accent-6);
  
  &:nth-child(2) {
    width: 90%;
  }
  
  &:nth-child(3) {
    width: 70%;
  }
`;

export const CardFooter = styled(Flex)`
  margin-top: var(--space-3);
  justify-content: space-between;
  align-items: center;
`;

export const CardPrice = styled(Skeleton)`
  width: 60px;
  height: 1.25rem;
  border-radius: var(--radius-1);
  background: var(--accent-7);
`;

export const CardButton = styled(Skeleton)`
  width: 80px;
  height: 2rem;
  border-radius: var(--radius-2);
  background: var(--accent-7);
`;
