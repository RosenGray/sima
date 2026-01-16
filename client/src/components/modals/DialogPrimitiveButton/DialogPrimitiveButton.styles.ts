"use client";
import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { Box } from "@radix-ui/themes";

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

// Content styling - matches Radix UI Themes Dialog.Content exactly
// All padding/margin removed - styling comes from children
export const DialogPrimitiveButtonContent = styled(Dialog.Content)`
  /* Match Radix UI Themes Dialog.Content default styles exactly */
  /* Based on computed styles from browser inspection */
  background-color: var(--color-panel-solid);
  z-index: 1;
  box-sizing: border-box;
  padding: 1.2rem;
  width: 100%;

  width: 400px;
  border-radius: 12px; /* Radix UI Themes uses 12px for Dialog, not --radius-4 */
  box-shadow: var(--shadow-6);
  border: 0px none; /* Radix UI Themes Dialog has no border */
  color: var(--gray-12);

  /* Positioning */
  position: fixed;
  z-index: 50;

  /* Transform removed to allow custom positioning */
  transform: none !important;

  /* Animation matches Radix UI Themes */
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

  /* Match Radix UI Themes Dialog.Content typography defaults */
  font-size: 16px;
  line-height: 24px;
`;

// Content container - matches DialogContentContainer from DialogButton
export const DialogContentContainer = styled(Box)`

  /* Additional container styling if needed */
`;

export const DialogPrimitiveButtonTitle = styled(Dialog.Title)`
  margin: 0 0 12px 0;
  font-weight: 700;
  color: var(--gray-12);
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 12px;
`;