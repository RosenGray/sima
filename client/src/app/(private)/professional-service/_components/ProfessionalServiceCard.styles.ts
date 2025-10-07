"use client";
import styled from "styled-components";
import { Box, Card as RadixCard, Text, Heading } from "@radix-ui/themes";

export const Card = styled(RadixCard)`
  width: 400px;
  height: 400px;
  background: var(--color-background);
  border: 1px solid var(--gray-6);
  border-radius: var(--radius-4);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-3);
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-6);
    border-color: var(--gray-8);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--blue-9), var(--purple-9));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

export const CardImageContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

export const CardImageOverlay = styled(Box)`
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  background: rgba(0, 0, 0, 0.8);
  border-radius: var(--radius-3);
  padding: var(--space-2) var(--space-3);
  backdrop-filter: blur(4px);
`;

export const CardImageCount = styled(Text)`
  color: white;
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-semibold);
`;

export const CardContent = styled(Box)`
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
`;

export const CardCategory = styled(Text)`
  font-size: var(--font-size-1);
  color: var(--blue-11);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

export const CardTitle = styled(Heading)`
  font-size: var(--font-size-5);
  font-weight: var(--font-weight-bold);
  color: var(--gray-12);
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.01em;
`;

export const CardDescription = styled(Text)`
  font-size: var(--font-size-3);
  color: var(--gray-11);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

export const CardLocation = styled(Box)`
  font-size: var(--font-size-2);
  color: var(--gray-10);
  font-weight: var(--font-weight-medium);
  display: flex;
  align-items: center;
  gap: var(--space-1);
`;

export const CardContact = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin-top: var(--space-2);
  padding-top: var(--space-2);
  border-top: 1px solid var(--gray-6);
`;

export const CardContactItem = styled(Box)`
  font-size: var(--font-size-1);
  color: var(--gray-10);
  display: flex;
  align-items: center;
  gap: var(--space-1);
`;
