"use client";
import styled from "styled-components";
import { Container, Grid } from "@radix-ui/themes";

export const PublishAdPageContainer = styled(Container)`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);

  @media (min-width: 768px) {
    padding: var(--space-8) var(--space-6);
  }
`;

export const PublishAdGrid = styled(Grid)``;
