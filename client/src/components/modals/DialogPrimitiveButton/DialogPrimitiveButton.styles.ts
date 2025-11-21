"use client";
import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { Box, Heading } from "@radix-ui/themes";

// Overlay styling - matches Radix UI Themes Dialog overlay
export const DialogPrimitiveButtonOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  z-index: 50;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Content styling - matches Radix UI Themes Dialog.Content
// All padding/margin removed - styling comes from children
export const DialogPrimitiveButtonContent = styled(Dialog.Content)`
  background-color: var(--color-panel);
  border-radius: var(--radius-4);
  box-shadow: var(--shadow-5);
  border: 1px solid var(--gray-6);
  position: fixed;
  z-index: 50;
  padding: 0 !important;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  transform: none !important;
  min-width: 0 !important;
  min-height: 0 !important;
  max-width: none !important;
  max-height: none !important;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translateY(-4px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  &:focus {
    outline: none;
  }
`;

// Title styling - matches Radix UI Themes Dialog.Title
export const DialogPrimitiveButtonTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  color: var(--gray-12);
  font-size: var(--font-size-4);
  line-height: var(--line-height-4);
  margin-bottom: var(--space-2);
`;

// Content container - matches DialogContentContainer from DialogButton
export const DialogContentContainer = styled(Box)`
  /* Additional container styling if needed */
`;

