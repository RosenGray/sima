"use client";
import { Container, Flex } from "@radix-ui/themes";
import { styled } from "styled-components";

export const ContactUsLayoutSection = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const ContactUsLayoutMain = styled.main`
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContactUsLayoutContainer = styled(Container)``;
