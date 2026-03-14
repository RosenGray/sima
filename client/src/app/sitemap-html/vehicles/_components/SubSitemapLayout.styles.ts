"use client";

import styled from "styled-components";
import { Box, Container, Heading } from "@radix-ui/themes";

export const SubSitemapContainer = styled(Container)`
  padding-top: 40px;
  padding-bottom: 60px;

  > p {
    font-size: var(--font-size-2);
    color: var(--gray-11);
    margin-bottom: var(--space-6);

    a {
      color: var(--accent-11);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const PageTitle = styled(Heading)`
  margin-bottom: var(--space-3);
`;

export const ManufacturerSection = styled(Box)`
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--gray-4);

  &:last-child {
    border-bottom: none;
  }
`;

export const ManufacturerHeading = styled(Heading)`
  margin-bottom: var(--space-2);

  a {
    color: var(--gray-12);
    text-decoration: none;
    &:hover {
      color: var(--accent-11);
      text-decoration: underline;
    }
  }
`;

export const ModelList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
`;

export const ModelItem = styled.li`
  a {
    color: var(--accent-11);
    font-size: var(--font-size-2);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
