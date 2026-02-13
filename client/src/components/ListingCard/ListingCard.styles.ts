"use client";
import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";

export const ListingCardBox = styled(Box)`
  width: 250px;
  height: 300px;
  border-radius: var(--radius-3);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
`;

export const ListingCardStyled = styled(Card)`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  box-shadow: inset var(--shadow-4);
  position: relative;
`;

export const LikeButtonWrapper = styled.div`
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  border-radius: var(--radius-full);
  padding: var(--space-1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const ListingCardImageBlock = styled(Box)`
  width: 100%;
  height: 140px;
  flex-shrink: 0;
  position: relative;
  background: var(--gray-3);
`;

export const ListingCardImageContainer = styled(Box)`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const ListingCardContent = styled(Flex)`
  flex: 1;
  flex-direction: column;
  padding-top: var(--space-3);
  gap: var(--space-2);
  min-height: 0;
`;

export const ListingCardTitle = styled(Box)`
  display: flex;
  max-width: 50%;
  min-width: 0;

`;

export const ListingCardSubtitle = styled(Box)`
  display: flex;
  max-width: 50%;
  min-width: 0;
`;

export const ListingCardDescription = styled(Box)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ListingCardFooter = styled.footer`
  width: 100%;
  padding: var(--space-2) var(--space-3);
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--gray-6);

  gap: var(--space-2);

`;

export const ListingCardHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  gap: var(--space-2);


`;
