import styled from "styled-components";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--accent-1);
  border-bottom: 1px solid var(--gray-6);
  z-index: 1000;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    min-height: var(--header-height);
    max-height: var(--header-height);
    padding: 0 1em;
  }

  @media (min-width: 768px) {
    padding: 0 1em;
  }
`;

export const HeaderTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4rem;
  flex-shrink: 0;
`;

export const HeaderBottomRow = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem;
    padding: 0.25rem 0 0.5rem;
    border-top: 1px solid var(--gray-6);
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
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

export const NavLikItem = styled(Link)`
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
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  span {
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transition: 
      transform 0.3s cubic-bezier(.4,0,.2,1),
      opacity 0.3s cubic-bezier(.4,0,.2,1);
    left: 0;

    &:nth-child(1) {
      top: 6px;
      transform: ${({ $isOpen }) =>
        $isOpen ? 'rotate(45deg) translateY(6px)' : 'none'};
    }

    &:nth-child(2) {
      top: 11px;
      opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
      transform: none;
    }

    &:nth-child(3) {
      top: 16px;
      transform: ${({ $isOpen }) =>
        $isOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'};
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

export const PublishAdButton = styled(Button)`
  border-radius: var(--radius-2);
  cursor: pointer;
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:hover {
    background: var(--accent-10);
  }
`;
