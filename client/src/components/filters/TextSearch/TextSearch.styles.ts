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
    --text-field-focus-color: var(--accent-12);
    --text-field-selection-color: var(--accent-12);
  }
`;

export const SearchInputSlot = styled(TextField.Slot)``;
