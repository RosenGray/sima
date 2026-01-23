"use client";
import { Box, Card, Flex } from "@radix-ui/themes";
import { styled } from "styled-components";

export const FormShell = styled(Box)`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
`;

export const HeroCard = styled(Card)`
  width: 100%;
  background: linear-gradient(
    135deg,
    var(--accent-a3) 0%,
    var(--accent-a1) 100%
  );
`;

export const SectionCard = styled(Card)`
  width: 100%;
`;

export const DropzoneSurface = styled(Box)`
  border-radius: var(--radius-4);
  background-color: var(--gray-a2);
  border: 1px dashed var(--accent-a6);
`;
