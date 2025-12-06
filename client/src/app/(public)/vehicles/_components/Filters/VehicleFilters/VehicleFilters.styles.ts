"use client";
import styled from "styled-components";
import { Button, Flex } from "@radix-ui/themes";
import { breakpoints } from "@/globals";

export const VehicleFiltersContainer = styled.div<{ $isModalOpen: boolean }>`
  transform: translateY(-50%);
  background: var(--accent-1);
  min-height: 130px;
  border-radius: var(--radius-3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--gray-6);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  transition: all 0.2s ease;
  position: relative;
  border: 1px solid red;

  @media (max-width: ${breakpoints.sm - 1}px) {
    position: fixed;
    inset: 0;
    top: var(--header-height);
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

export const VehicleFiltersHeader = styled.header`
  height: 60px;
  flex-shrink: 0;
  border-bottom: 0.5px solid var(--gray-6);
  display: flex;
  align-items: center;
  padding: 0 var(--space-4);
  background: var(--accent-2);

  @media (max-width: ${breakpoints.sm - 1}px) {
    padding: var(--space-4) var(--space-5);
  }
`;

export const VehicleFiltersContent = styled.div`
  border: 1px solid blue;
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