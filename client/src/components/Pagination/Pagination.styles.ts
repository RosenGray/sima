import styled from "styled-components";
import { Button, Box } from "@radix-ui/themes";

export const PaginationContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 0;
  flex-wrap: wrap;
`;

export const PaginationButton = styled(Button)<{ $isActive?: boolean }>`
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border-radius: var(--radius-2);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$isActive ? 'var(--accent-9)' : 'var(--color-surface)'};
  color: ${props => props.$isActive ? 'white' : 'var(--gray-12)'};
  border: 1px solid ${props => props.$isActive ? 'var(--accent-9)' : 'var(--gray-6)'};
  
  &:hover:not(:disabled) {
    background: ${props => props.$isActive ? 'var(--accent-10)' : 'var(--gray-3)'};
    border-color: ${props => props.$isActive ? 'var(--accent-10)' : 'var(--gray-8)'};
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: var(--gray-2);
    border-color: var(--gray-5);
    color: var(--gray-9);
  }
`;

export const PaginationNavButton = styled(PaginationButton)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 16px;
  font-weight: 500;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const PaginationEllipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  color: var(--gray-10);
  font-size: 14px;
  user-select: none;
`;

export const PaginationInfo = styled.span`
  font-size: 14px;
  color: var(--gray-11);
  margin: 0 8px;
  user-select: none;
  
  @media (max-width: 520px) {
    display: none;
  }
`;

