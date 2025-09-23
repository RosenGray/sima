import {  IconButton } from "@radix-ui/themes";
import { styled } from "styled-components";

export const ThemeToggleButton = styled(IconButton)`
  cursor: pointer;
  border-radius: var(--radius-2);

  &:hover {
    background: var(--gray-4);
  }
`;
