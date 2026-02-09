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

export const SearchInputSlot = styled(TextField.Slot)`
  color: var(--gray-10);
  
  &:hover {
    color: var(--gray-12);
  }
`;

