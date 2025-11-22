"use client";
import styled from "styled-components";
import { Dialog, Box, Flex } from "@radix-ui/themes";

export const MoreFiltersModalContent = styled(Dialog.Content)`
  max-width: 600px !important;
  width: 90vw;
  max-height: 80vh;
  background: var(--accent-1);
  border-radius: var(--radius-4);
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    max-width: 100vw !important;
    width: 100vw;
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
  }
`;

export const MoreFiltersModalHeader = styled(Box)`
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--gray-6);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: var(--accent-2);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  gap: var(--space-3);
`;

export const MoreFiltersModalBody = styled(Box)`
  flex: 1;
  overflow-y: auto;
  padding: var(--space-5);
  -webkit-overflow-scrolling: touch;
`;

export const MoreFiltersModalFooter = styled(Box)`
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--gray-6);
  display: flex;
  justify-content: flex-end;
  background: var(--accent-2);
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
`;

