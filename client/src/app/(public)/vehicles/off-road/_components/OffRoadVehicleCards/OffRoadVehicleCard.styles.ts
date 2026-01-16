"use client";
import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

export const OffRoadVehicleCardBox = styled(Box)`
  width: 100%;
  height: 100%;
  border-radius: var(--radius-3);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
`;

export const OffRoadVehicleCardStyled = styled(Card)`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  box-shadow: inset var(--shadow-4);
`;

export const OffRoadVehicleCardHeader = styled.header`
  width: 100%;
  padding: var(--space-2);
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const OffRoadVehicleCardImages = styled(Box)`
  width: 100%;
  height: 200px;
  flex-shrink: 0;
`;

export const OffRoadVehicleCardImageContainer = styled(Box)`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const OffRoadVehicleCardContent = styled(Flex)`
  flex: 1;
  flex-direction: column;
  padding: var(--space-3);
  gap: var(--space-2);
`;

export const OffRoadVehicleCardFooter = styled.footer`
  width: 100%;
  padding: var(--space-2) var(--space-3);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  align-items: center;
`;

export const OffRoadVehicleCardSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

export const OffRoadVehicleCardSwiperSlide = styled(SwiperSlide)``;
