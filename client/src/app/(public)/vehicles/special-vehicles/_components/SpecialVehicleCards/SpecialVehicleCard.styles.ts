"use client";
import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

export const SpecialVehicleCardBox = styled(Box)`
  width: 100%;
  height: 100%;
  border-radius: var(--radius-3);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
`;

export const SpecialVehicleCardStyled = styled(Card)`
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

export const SpecialVehicleCardHeader = styled.header`
  width: 100%;
  padding: var(--space-2);
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const SpecialVehicleCardImages = styled(Box)`
  width: 100%;
  height: 200px;
  flex-shrink: 0;
`;

export const SpecialVehicleCardImageContainer = styled(Box)`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const SpecialVehicleCardContent = styled(Flex)`
  flex: 1;
  flex-direction: column;
  padding: var(--space-3);
  gap: var(--space-2);
`;

export const SpecialVehicleCardFooter = styled.footer`
  width: 100%;
  padding: var(--space-2) var(--space-3);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  align-items: center;
`;

export const SpecialVehicleCardSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

export const SpecialVehicleCardSwiperSlide = styled(SwiperSlide)``;
