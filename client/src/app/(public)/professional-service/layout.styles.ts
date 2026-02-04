"use client";
import { Box } from "@radix-ui/themes";
import styled from "styled-components";

export const ProfessionalServiceLayoutSection = styled.section`
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

/** Container for Next.js Image stripe: relative, fixed height, full width for fill + object-fit */
export const ProfessionalServiceLayoutStripe = styled(Box)`
  position: relative;
  width: 100%;
  height: 270px;
  overflow: hidden;
`;