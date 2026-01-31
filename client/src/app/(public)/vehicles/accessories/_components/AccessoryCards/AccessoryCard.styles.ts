"use client";
import { Card, Box, Flex } from "@radix-ui/themes";
import { Swiper } from "swiper/react";
import styled from "styled-components";

export const AccessoryCardBox = styled(Box)`
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const AccessoryCardStyled = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;

  ${AccessoryCardBox}:hover & {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: var(--accent-8);
  }
`;

export const AccessoryCardHeader = styled(Flex)`
  margin-bottom: var(--space-2);
  gap: var(--space-2);
`;

export const AccessoryCardImages = styled(Box)`
  width: 100%;
  height: 200px;
  position: relative;
  border-radius: var(--radius-3);
  overflow: hidden;
  margin-bottom: var(--space-3);
  background: var(--gray-3);
`;

export const AccessoryCardImageContainer = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const AccessoryCardSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-slide {
    height: 100%;
  }
`;

export const AccessoryCardSwiperSlide = styled.div`
  width: 100%;
  height: 100%;
`;

export const AccessoryCardContent = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
`;

export const AccessoryCardFooter = styled(Flex)`
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-top: auto;
`;

export const LikeButtonWrapper = styled(Box)`
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  z-index: 1;
`;
