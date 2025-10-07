"use client";
import styled from "styled-components";
import { Container, Grid, Heading } from "@radix-ui/themes";

export const ProfessionalsPageContainer = styled(Container)`


  /* margin: 0 auto;
  border: 1px solid green;
  height: 100vh;

  h1 {
    font-size: var(--font-size-7);
    font-weight: var(--font-weight-bold);
    color: var(--gray-12);
    margin-bottom: var(--space-8);
    text-align: center;
    letter-spacing: -0.02em;
  }
`;

export const ProfessionalsGrdid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  justify-items: center;
  
  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-5);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  } */
`;


export const Title = styled(Heading)`
color:red;
`;
export const ProfessionalsServicesGrid = styled(Grid)`
 border:2px solid green;
`