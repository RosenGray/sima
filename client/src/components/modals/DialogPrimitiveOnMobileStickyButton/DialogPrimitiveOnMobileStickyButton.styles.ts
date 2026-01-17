"use client";
import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { Box } from "@radix-ui/themes";
import { breakpoints } from "@/globals";

// Overlay styling - matches Radix UI Themes Dialog overlay
export const DialogPrimitiveOnMobileStickyButtonOverlay = styled(
  Dialog.Overlay
)`
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
export const DialogPrimitiveOnMobileStickyButtonContent = styled(
  Dialog.Content
)`
  /* Match Radix UI Themes Dialog.Content default styles exactly */
  /* Based on computed styles from browser inspection */
  background-color: var(--color-panel-solid);
  z-index: 1;
  box-sizing: border-box;
  padding: 1.2rem;
  width: 100%;

  /* Desktop default styles */
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

  /* Mobile sticky styles */
  @media (max-width: ${breakpoints.sm - 1}px) {
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    top: auto !important;
    width: 100% !important;
    max-width: 100% !important;
    border-radius: 12px 12px 0 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
    max-height: 90vh;
    overflow-y: auto;
    
    /* Mobile animation - slide up from bottom */
    animation: mobileContentShow 200ms cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes mobileContentShow {
      from {
        opacity: 0;
        transform: translateY(100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
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
