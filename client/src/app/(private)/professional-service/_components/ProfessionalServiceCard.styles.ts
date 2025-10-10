"use client";
import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

export const ServiceCardBox = styled(Box)`
  width: 100%;
  height: 400px;
  border-radius: var(--radius-3);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ServiceCard = styled(Card)`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const ServiceCardImages = styled(Flex)`
  border: 1px solid green;
  flex:1;
`;

export const ServiceCardImageContainer = styled(Box)`
  height: 100%;

  /* flex:1 0 100%; */
  /* max-height: 85%; */
  position: relative;
`;
//Header
export const ServiceCardHeader = styled.header`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  border: 1px solid red;
`;
export const ServiceCardFooter = styled.footer`
  height: 100px;
  width: 100%;
  border: 1px solid blue;
`;

export const ServiceCardSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;
export const ServiceCardSwiperSlide = styled(SwiperSlide)`
  /* width: 100%;
  height: 100%; */
`;