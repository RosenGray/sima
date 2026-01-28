"use client";

import { Box, Flex, Grid } from "@radix-ui/themes";
import { styled } from "styled-components";

export const FieldsetWrapper = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  min-inline-size: 0;
`;

export const ButtonList = styled(Grid)`
  margin-top: var(--space-3);
`;

export const CheckboxButtonLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  border-radius: var(--radius-3);
  border: 1px solid var(--gray-6);
  background: var(--gray-1);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: var(--gray-8);
    background: var(--gray-2);
  }

  &:has(input:checked) {
    border-color: var(--accent-8);
    background: var(--accent-a2);
    box-shadow: 0 0 0 1px var(--accent-8);
  }

  &:has(input:focus-visible) {
    outline: 2px solid var(--accent-8);
    outline-offset: 2px;
  }

  &:has(input:disabled) {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const HiddenCheckboxInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const IconTextWrapper = styled(Flex)`
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
`;

export const LegendBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
`;
