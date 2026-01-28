"use client";
import { Box } from "@radix-ui/themes";
import styled from "styled-components";

export const PetsLayoutSection = styled.section`
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

export const PetsLayoutStripe = styled(Box)<{ $src: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: var(--space-4);

  @media (min-width: 768px) {
    height: 300px;
  }

  @media (min-width: 1024px) {
    height: 400px;
  }
`;
