import styled, { keyframes } from 'styled-components';
import * as RadixUiTooltip from "@radix-ui/react-tooltip";

const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const TooltipContent = styled(RadixUiTooltip.Content)`
  background-color: var(--gray-12);
  border-radius: 6px;
  font-size: var(--space-1);
  line-height: 1.4;
  color: var(--gray-1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  user-select: none;
  animation: ${slideUpAndFade} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &[data-state="delayed-open"] {
    animation: ${slideUpAndFade} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

export const TooltipArrow = styled(RadixUiTooltip.Arrow)`
  fill: var(--gray-12);
  width: 10px;
  height: 5px;

  ${TooltipContent}[data-side="top"] & {
    bottom: -4px;
  }

  ${TooltipContent}[data-side="bottom"] & {
    top: -4px;
  }

  ${TooltipContent}[data-side="left"] & {
    right: -4px;
  }

  ${TooltipContent}[data-side="right"] & {
    left: -4px;
  }
`;

export const TooltipTrigger = styled(RadixUiTooltip.Trigger)`
  &:focus-visible {
    outline: 2px solid #4d90fe;
    outline-offset: 2px;
    border-radius: 2px;
  }
`;
