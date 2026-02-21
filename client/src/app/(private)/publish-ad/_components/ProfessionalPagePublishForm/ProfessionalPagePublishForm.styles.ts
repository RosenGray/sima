"use client";
import { Box, Card } from "@radix-ui/themes";
import { styled } from "styled-components";

export const EditModeUrlCard = styled(Box)`
  padding: var(--space-3) var(--space-4);
  background: var(--gray-a2);
  border-radius: var(--radius-3);
  border: 1px solid var(--gray-6);
  width: 100%;
`;

export const EditModeUrlText = styled.a`
  font-family: ui-monospace, "SF Mono", "Cascadia Mono", monospace;
  font-size: var(--font-size-2);
  color: var(--accent-11);
  word-break: break-all;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: var(--accent-12);
    text-decoration: underline;
  }
`;

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

export const ProfileImageWrap = styled(Box)`
  width: 120px;
  height: 120px;
  border-radius: var(--radius-3);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;
