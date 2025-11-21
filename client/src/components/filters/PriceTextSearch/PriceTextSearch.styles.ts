import styled from "styled-components";
import { TextField } from "@radix-ui/themes";

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-12);
  margin-bottom: 8px;
`;

export const SearchInputRoot = styled(TextField.Root)`
  position: relative;
  width: 100%;
  height: 40px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus-within {
    --text-field-focus-color: var(--accent-9);
    --text-field-selection-color: var(--accent-5);
    border-color: var(--accent-9);
    box-shadow: 0 0 0 2px var(--accent-5);
  }

  &:hover:not(:focus-within) {
    border-color: var(--gray-8);
  }
`;

export const SearchInputSlot = styled(TextField.Slot)`
  color: var(--gray-10);
  
  &:hover {
    color: var(--gray-12);
  }
`;

