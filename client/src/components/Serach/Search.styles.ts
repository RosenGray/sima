import styled from "styled-components";
import { TextField } from "@radix-ui/themes";

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
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
  
  &:focus-within {
    --text-field-focus-color: var(--accent-9);
    --text-field-selection-color: var(--accent-9);
  }
`;

export const SearchInput = styled(TextField.Slot)`
  padding-right: 40px;
  border-radius: var(--radius-3);
  background: var(--color-surface);
  border: 1px solid var(--gray-6);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--gray-8);
  }
  
  &:focus {
    border-color: var(--accent-9);
    box-shadow: 0 0 0 2px var(--accent-4);
  }
  
  &::placeholder {
    color: var(--gray-10);
  }
`;

export const SearchIconContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--gray-10);
  transition: color 0.2s ease;
  
  ${SearchInputRoot}:focus-within & {
    color: var(--accent-9);
  }
`;
