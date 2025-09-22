import { css, styled } from "styled-components";
import { Dialog } from "@radix-ui/themes";

export const ErrorModalContent = styled(Dialog.Content)`
    box-shadow: inset var(--shadow-4);
    border:2px solid red;
`;

const DialotGil = styled.h1`
  
    color: red;
`;



export const DialogDescription = styled.p`
${DialotGil};
    color: red;
`;