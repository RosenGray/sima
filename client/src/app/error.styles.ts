"use client";
import { Button, Container, Heading, Text } from '@radix-ui/themes';
import styled from 'styled-components';

export const ErrorPageContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
`;

export const IconWrapper = styled.div`
  background-color: var(--orange-3);
  padding: var(--space-5);
  border-radius: var(--radius-4);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--orange-4);
    transition: background-color 0.2s ease;
  }
`;


export const StyledHeading = styled(Heading)`
  color: var(--gray-12);
  text-align: center;
  margin-bottom: var(--space-2);
`;

export const Message = styled(Text)`
  color: var(--gray-11);
  text-align: center;
  max-width: 500px;
  line-height: 1.6;
`;

export const GoBackButton = styled(Button)`
  &:hover {
    transform: translateY(-1px);
    transition: transform 0.2s ease;
  }
  cursor: pointer;
`;

export const RetryButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    transition: transform 0.2s ease;
  }

  svg {
    margin-right: var(--space-1);
  }
`;