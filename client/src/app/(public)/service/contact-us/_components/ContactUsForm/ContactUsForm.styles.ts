"use client";
import { Box, Flex } from "@radix-ui/themes";
import { styled } from "styled-components";

export const ContactUsFormContainer = styled(Box)`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
`;

export const ContactUsFormOverlay = styled(Flex)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
`;
