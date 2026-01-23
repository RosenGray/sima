"use client";
import styled from "styled-components";
import { Button, Flex } from "@radix-ui/themes";
import { breakpoints } from "@/globals";

export const PetFiltersContainer = styled.div<{ $isModalOpen: boolean }>`
  transform: translateY(-50%);
  background: var(--accent-1);
  min-height: 130px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--gray-6);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  transition: all 0.2s ease;
  position: relative;
  border-radius: var(--radius-4);

  @media (max-width: ${breakpoints.sm - 1}px) {
    position: fixed;
    inset: 0;
    transform: translateY(0);
    opacity: ${({ $isModalOpen }) => ($isModalOpen ? 1 : 0)};
    z-index: ${({ $isModalOpen }) => ($isModalOpen ? 1000 : -1)};
    transition: all 0.2s ease;
  }

  &:hover {
    border-color: var(--gray-7);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const PetFiltersHeader = styled.header`
  height: 50px;
  flex-shrink: 0;
  border-bottom: 0.5px solid var(--gray-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4);
  background: var(--accent-2);
  display: none;

  @media (max-width: ${breakpoints.sm - 1}px) {
    padding: var(--space-4) var(--space-5);
    display: flex;
  }
`;

export const PetFiltersContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
`;

export const MobileFilterButton = styled(Button)`
  display: none;

  @media (max-width: ${breakpoints.sm - 1}px) {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;

export const FiltersCountBadge = styled(Flex)`
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  background: var(--accent-9);
  color: var(--accent-1);
  font-size: 11px;
  font-weight: 600;
  padding: 0 6px;
`;

export const PetFiltersNavBar = styled.nav`
  padding-top: 10px;
  height: 60px;
`;

export const PetsFiltersNavBarList = styled.ul`
  display: flex;
  height: 100%;
  overflow-x: auto;
  gap: 5px;
  justify-content: center;
`;

export const PetFiltersNavBarItem = styled.li<{ $isActive: boolean }>`
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: calc(100% / 3);
  display: flex;

  & > a {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: var(--space-2);
    border-radius: var(--radius-2);
    background: ${({ $isActive }) =>
      $isActive ? "var(--accent-3)" : "transparent"};
    border: 2px solid
      ${({ $isActive }) =>
        $isActive ? "var(--accent-9)" : "transparent"};
    transition: all 0.2s ease;

    &:hover {
      background: var(--accent-3);
    }
  }
`;
