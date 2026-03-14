"use client";

import styled from "styled-components";
import { Box, Container, Heading } from "@radix-ui/themes";

export const SitemapContainer = styled(Container)`
  padding-top: 40px;
  padding-bottom: 60px;
`;

export const PageTitle = styled(Heading)`
  margin-bottom: var(--space-6);
`;

export const SectionBlock = styled(Box)`
  margin-bottom: var(--space-6);
`;

export const SectionHeading = styled(Heading)`
  margin-bottom: var(--space-3);
  border-bottom: 1px solid var(--gray-5);
  padding-bottom: var(--space-2);
`;

export const SubSectionHeading = styled(Heading)`
  margin-top: var(--space-4);
  margin-bottom: var(--space-2);
`;

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
`;

export const LinkItem = styled.li`
  a {
    color: var(--accent-11);
    text-decoration: none;
    font-size: var(--font-size-2);

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SubSitemapLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--accent-11);
  font-size: var(--font-size-2);
  text-decoration: none;
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--accent-6);
  border-radius: var(--radius-2);

  &:hover {
    background: var(--accent-2);
    text-decoration: none;
  }
`;
