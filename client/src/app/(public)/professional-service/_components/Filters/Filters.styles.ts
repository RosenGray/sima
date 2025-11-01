"use client";
import styled from "styled-components";
import { Box, Skeleton, Dialog, Button } from "@radix-ui/themes";
import { breakpoints } from "@/globals";

export const LoadingFilters = styled(Skeleton)`
  padding: var(--space-4);
  margin: 0 auto;
  border-radius: var(--radius-2);
  background: var(--accent-9);
  height: 60px;
`;

export const FiltersContainer = styled(Box)`
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 24px;
  background: var(--accent-1);
  border: 1px solid var(--gray-6);
  border-radius: var(--radius-3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  /* min-height: 130px; */

  @media (max-width: ${breakpoints.sm - 1}px) {
    padding: 16px;
    justify-content: center;
  }

  &:hover {
    border-color: var(--gray-7);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
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

export const ClearFiltersButton = styled(Button)`
  white-space: nowrap;
  
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

export const SearchSection = styled.div`
  flex: 0 0 400px;
  min-width: 300px;
`;

export const FiltersSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  flex: 1;
  align-items: center;
`;

export const FiltersModalContent = styled(Dialog.Content)`
  max-width: 100vw !important;
  max-height: 100vh !important;
  width: 100vw;
  height: 100vh;
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
  overflow-y: auto;
  padding: var(--space-5);
  -webkit-overflow-scrolling: touch;
`;

export const ModalFiltersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

export const ModalFooter = styled(Box)`
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--gray-6);
  display: flex;
  gap: var(--space-3);
  background: var(--accent-2);
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
`;