import { TextField } from "@radix-ui/themes";
import styled from "styled-components";

export const AuthTextFieldRoot = styled(TextField.Root)`
  &:has(input[data-isvalid="false"]) {
    --text-field-focus-color: red;
    --text-field-selection-color: red;
    box-shadow: inset 0 0 0 var(--text-field-border-width) var(--red-9);
  }
`;
