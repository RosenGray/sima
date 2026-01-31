import styled from "styled-components";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

export const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--black-a9);
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  z-index: 9998;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileMenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 4rem;
  left: 0;
  bottom: 0;
  width: 80%;
  max-width: 320px;
  background: var(--color-background);
  border-right: 1px solid var(--gray-6);
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 9999;
  overflow-y: auto;
  box-shadow: ${props => props.$isOpen ? 'var(--shadow-5)' : 'none'};
  
  /* Animation for sub-items */
  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      max-height: 300px;
      transform: translateY(0);
    }
  }
  
  @media (min-width: 768px) {
    display: none;
  }
`;

export const NavMobileItemContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export const MobileMenuActionsSection = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--gray-6);
`;

export const MobilePublishAdButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: var(--radius-3);
  cursor: pointer;
  padding: 0.75rem;
  
  &:hover {
    background: var(--accent-10);
  }
`;

export const NavigationItemsContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`;

export const NavMobileItemHeader = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  cursor: pointer;
  background-color: ${props => props.$isExpanded ? 'var(--gray-3)' : 'transparent'};
  border-radius: var(--radius-2);
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--gray-2);
  }
`;

export const NavMobileItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  color: var(--accent-9);
`;

export const NavMobileItemArrow = styled.div<{ $isExpanded: boolean }>`
  font-size: 0.75rem;
  color: var(--gray-10);
  transform: ${props => props.$isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
`;

export const NavMobileItemSubMenu = styled.div`
  padding-left: 1rem;
  padding-bottom: 0.5rem;
  animation: slideDown 0.2s ease-out;
`;

export const NavMobileSubItem = styled(Link)`
  display: block;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--gray-11);
  border-radius: var(--radius-2);
  transition: all 0.2s ease;
  text-decoration: none;
  
  &:hover {
    background-color: var(--gray-3);
    color: var(--gray-12);
  }
`;

export const NavMobileItemSeparator = styled.div`
  height: 1px;
  background-color: var(--gray-6);
  margin: 0.5rem 0;
`;
