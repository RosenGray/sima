"use client";
import styled from "styled-components";

export const ProfessionalServiceLayoutSection = styled.section`
  display: flex;
  flex-direction: column;
  &:before {
    content: "";
    display: block;
    height: var(--header-height);
    border: 2px solid red;
  }
  main {
    flex: 1;
  }
`;
