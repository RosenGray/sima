"use client";
import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

export const PetForFreeCardBox = styled(Box)`
  width: 100%;
  height: 100%;
  border-radius: var(--radius-3);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
`;

export const PetForFreeCardStyled = styled(Card)`
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
`;

export const PetForFreeCardHeader = styled.header`
  width: 100%;
  padding: var(--space-2);
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const PetForFreeCardImages = styled(Box)`
  width: 100%;
  height: 200px;
  flex-shrink: 0;
`;

export const PetForFreeCardImageContainer = styled(Box)`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const PetForFreeCardContent = styled(Flex)`
  flex: 1;
  flex-direction: column;
  padding: var(--space-3);
  gap: var(--space-2);
`;

export const PetForFreeCardFooter = styled.footer`
  width: 100%;
  padding: var(--space-2) var(--space-3);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  align-items: center;
`;

export const PetForFreeCardSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

export const PetForFreeCardSwiperSlide = styled(SwiperSlide)``;
