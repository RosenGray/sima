"use client";
import styled from "styled-components";
import { Container } from "@radix-ui/themes";

export const HomeLobby = styled(Container)`
  &:before {
    content: "";
    display: block;
    height: var(--header-height);
  }
`;
