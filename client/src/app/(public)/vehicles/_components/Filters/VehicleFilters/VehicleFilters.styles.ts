"use client";
import styled from "styled-components";
import { Dialog, Box, Button, Flex } from "@radix-ui/themes";
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
  /* padding: 20px 24px; */
  transition: all 0.2s ease;
  position: relative;
  border: 1px solid red;

  @media (max-width: ${breakpoints.sm - 1}px) {
    position: fixed;
    inset: 0;
    top: var(--header-height);
    transform: translateY(0);
    opacity: ${({ $isModalOpen }) => $isModalOpen ? 1 : 0};
    z-index: ${({ $isModalOpen }) => $isModalOpen ? 1000 : -1};
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
  -webkit-overflow-scrolling: touch;

  /* @media (max-width: ${breakpoints.sm - 1}px) {
    padding: var(--space-5);
  } */

  /* Hide mobile filters content on desktop */
  /* @media (min-width: ${breakpoints.sm}px) {
    .mobile-filters-content {
      display: none !important;
    }
  } */
`;

export const DesktopFiltersWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: ${breakpoints.sm - 1}px) {
    display: none;
  }
`;

export const MobileFilterButton = styled(Button)`
  display: none;

  @media (max-width: ${breakpoints.sm - 1}px) {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;

export const MobileFiltersModal = styled(Dialog.Content)`
  max-width: 100vw !important;
  max-height: 100dvh !important;
  width: 100vw;
  height: 100dvh;
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  background: var(--accent-1);
  border-radius: 0 !important;
  position: fixed;
  inset: 0;
  z-index: 1000;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (min-width: ${breakpoints.sm}px) {
    display: none;
  }
`;

export const ModalHeader = styled(Box)`
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--gray-6);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: var(--accent-2);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  gap: var(--space-3);
`;

export const ModalBody = styled(Box)`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 0;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
`;

export const ModalFooter = styled(Box)`
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--gray-6);
  display: flex;
  gap: var(--space-3);
  background: var(--accent-2);
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
`;

export const ModalFiltersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;
