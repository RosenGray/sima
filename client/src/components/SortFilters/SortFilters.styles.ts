"use client";
import styled from "styled-components";
import { Box } from "@radix-ui/themes";

export const SortFiltersContainer = styled(Box)`
padding: 0;
  width: 100%;
  max-height: 250px;
  overflow: auto;
`;

export const SortFiltersList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SortFiltersListItem = styled.li`
  display: flex;
  width: 100%;
  
  & > a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-2);
    color: var(--gray-12);
    text-decoration: none;
    font-size: var(--font-size-3);
    line-height: var(--line-height-3);
    transition: all 0.2s ease;
    background-color: var(--gray-2);
    border: 1px solid var(--gray-6);

    &[data-active="true"] {
      background-color: var(--accent-a3);
      border-color: var(--accent-8);
      color: var(--accent-12);
    }
    
    &:hover {
      background-color: var(--gray-4);
      border-color: var(--gray-8);
      color: var(--gray-12);
    }

    &[data-active="true"]:hover {
      background-color: var(--accent-a4);
      border-color: var(--accent-9);
      color: var(--accent-12);
    }
    
    &:active {
      background-color: var(--gray-5);
    }
    
    &:focus-visible {
      outline: 2px solid var(--accent-9);
      outline-offset: 2px;
    }
  }
  
  @media (max-width: 767px) {
    & > a {
      padding: var(--space-1) var(--space-3);
      font-size: var(--font-size-2);
    }
  }
`;
