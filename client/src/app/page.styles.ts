"use client";
import styled from "styled-components";
import { Container } from "@radix-ui/themes";

export const HomePageContainer = styled(Container)`
  &:before {
    content: "";
    display: block;
    height: var(--header-height);
    padding-top: 2rem;
  }
`;
