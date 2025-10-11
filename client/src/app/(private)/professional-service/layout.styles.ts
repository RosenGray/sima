"use client";
import styled from "styled-components";

export const ProfessionalServiceLayoutSection = styled.section`
height: 100%;
border: 1px solid red;
display: flex;
flex-direction: column;
  &:before {
    content: "";
    display: block;
    height: var(--header-height);
    border:2px solid red;
  }
  main{
    flex: 1;
 
  }
`;
