import styled from "styled-components";
import { Button, Flex } from "@radix-ui/themes";

export const PaginationContainer = styled(Flex)`
  flex-wrap: wrap;
  padding:1em;
`;

export const PaginationButton = styled(Button)<{ $isActive?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: var(--radius-2);
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$isActive ? 'var(--accent-5)' : 'var(--color-surface)'};
  color: ${props => props.$isActive ? 'var(--accent-12)' : 'var(--gray-12)'};
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

  /* Responsive sizes - Radix breakpoints */
  @media (min-width: 520px) {
    min-width: 40px;
    height: 40px;
    padding: 0 12px;
    font-size: 14px;
  }
`;

export const PaginationNavButton = styled(PaginationButton)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  font-weight: 500;
  
  svg {
    width: 14px;
    height: 14px;
  }

  /* Responsive - Radix breakpoints */
  @media (min-width: 520px) {
    padding: 0 16px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const PaginationNavButtonText = styled.span`
  display: none;

  /* Show text on xs and above - Radix breakpoint */
  @media (min-width: 520px) {
    display: inline;
  }
`;

export const PaginationEllipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  color: var(--gray-10);
  font-size: 13px;
  user-select: none;

  /* Responsive - Radix breakpoints */
  @media (min-width: 520px) {
    min-width: 40px;
    height: 40px;
    font-size: 14px;
  }
`;

export const PaginationInfo = styled.span`
  font-size: 13px;
  color: var(--gray-11);
  margin: 0 4px;
  user-select: none;
  display: none;

  /* Show on sm and above - Radix breakpoint */
  @media (min-width: 768px) {
    display: inline;
    margin: 0 8px;
    font-size: 14px;
  }
`;

