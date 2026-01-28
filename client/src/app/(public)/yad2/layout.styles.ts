"use client";
import { Box } from "@radix-ui/themes";
import styled from "styled-components";

export const Yad2LayoutSection = styled.section`
  display: flex;
  flex-direction: column;

  &:before {
    content: "";
    display: block;
    height: var(--header-height);
  }

  main {
    flex: 1;
    padding: 0.5rem;
  }
`;

export const Yad2LayoutStripe = styled(Box)<{ $src: string }>`
  height: 270px;
  position: relative;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: 0px 35%;
  background-repeat: no-repeat;
`;
