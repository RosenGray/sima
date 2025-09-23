"use client";
import { Box, Flex, Heading, IconButton ,Text} from "@radix-ui/themes";
import styled from "styled-components";

export const NotFoundContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const NotFoundContent = styled(Flex)`
  text-align: center;
  max-width: 600px;
  margin: auto;
`;

export const NotFoundErrorCode = styled(Heading)`
  font-size: 160px;
  line-height: 1;
  margin: 0;
  background: linear-gradient(
    135deg,
    var(--accent-9) 0%,
    var(--accent-11) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: float 6s ease-in-out infinite;
`;

export const NotFoundMagnifyingGlassIcon = styled(IconButton)`
  border: none;
  font-size: 24px;
  box-shadow: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;

export const NotFoundFirstLineContainer = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 2;
  gap: 0.5em;

  & > svg {
    fill: red;
  }
`;