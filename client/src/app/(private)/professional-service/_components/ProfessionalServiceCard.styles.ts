"use client";
import styled from "styled-components";
import { Box, Card } from "@radix-ui/themes";

export const ServiceCardBox = styled(Box)`
  width: 100%;
  height: 400px;
  border-radius: var(--radius-3);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ServiceCard = styled(Card)`
  height: 100%;
  width: 100%;
  margin: 0 auto;

`;

export const ServiceCardImageContainer = styled(Box)`
  height: 100%;
  max-height: 85%;
  position: relative;
`;
//Header
export const ServiceCardHeader = styled.header`
  flex: 1;
  width: 100%;
  border: 1px solid red;
`;
export const ServiceCardFooter = styled.footer`
  flex: 1;
  width: 100%;
  border: 1px solid blue;
`;
