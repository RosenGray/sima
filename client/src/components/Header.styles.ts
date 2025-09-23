import styled from 'styled-components';
import { Button } from '@radix-ui/themes';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
  padding:0 1em;
  background: var(--color-background);
  border-bottom: 1px solid var(--gray-6);
  z-index: 1000;
  backdrop-filter: blur(10px);
  @supports (backdrop-filter: blur(10px)) {
    background: var(--color-background-alpha);
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  
  &:hover {
    opacity: 0.8;
  }
`;

export const Nav = styled.nav`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

export const NavItem = styled.div`
  position: relative;
  cursor: pointer;
  
  &:hover > div:last-child {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  & > span {
    padding: 0.5rem 0;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--accent-9);
    }
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(-10px);
  min-width: 200px;
  background: var(--color-background);
  border: 1px solid var(--gray-6);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-5);
  padding: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 1001;
  
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 1rem;
    width: 12px;
    height: 12px;
    background: var(--color-background);
    border: 1px solid var(--gray-6);
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }
`;

export const DropdownItem = styled.a`
  display: block;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-2);
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: var(--gray-3);
  }
  
  & span {
    color: var(--gray-12);
  }
`;


export const MobileMenuButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--radius-2);
  padding: 0.5rem;
  
  @media (min-width: 768px) {
    display: none;
  }
  
  &:hover {
    background: var(--gray-4);
  }
`;

export const HamburgerIcon = styled.div<{ $isOpen: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  
  span {
    display: block;
    height: 2px;
    width: 100%;
    background: currentColor;
    border-radius: 1px;
    transition: all 0.3s ease;
    transform-origin: center;
    
    &:nth-child(1) {
      transform: ${props => props.$isOpen ? 'rotate(45deg) translateY(6px)' : 'rotate(0) translateY(0)'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.$isOpen ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${props => props.$isOpen ? 'rotate(-45deg) translateY(-6px)' : 'rotate(0) translateY(0)'};
    }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LoginButton = styled(Button)`
  border-radius: var(--radius-2);
  cursor: pointer;
  &:hover {
    background: var(--gray-4);
  }
`;

