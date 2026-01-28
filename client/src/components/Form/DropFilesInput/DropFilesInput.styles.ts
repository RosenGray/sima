import styled, { css } from "styled-components";
import { Text } from "@radix-ui/themes";
export const DropzoneContainer = styled.div<{ $isDragActive: boolean }>`
  border: 2px dashed #7c8ba1;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background-color: var(--color-surface);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  ${({ $isDragActive }) =>
    $isDragActive &&
    css`
      border: 2px dashed var(--red-11);
      background-color: var(--red-2);
    `}
  &:hover {
    border: 2px dashed var(--red-11);
    background-color: var(--red-2);
  }
`;

export const DropzoneText = styled.p`
  margin: 0;
  color: var(--gray-12);
  font-size: 1rem;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const DropzoneError = styled(Text)`
  color: var(--red-11);
  font-size: 1rem;
  line-height: 1.5;
  font-weight: bold;
`;
