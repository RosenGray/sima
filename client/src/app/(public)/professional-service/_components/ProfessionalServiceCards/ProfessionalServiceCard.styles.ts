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
  flex:1;
`;

export const ServiceCardImageContainer = styled(Box)`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const ServiceCardHeader = styled.header`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;
export const ServiceCardFooter = styled.footer`
  height: 100px;
  width: 100%;

  padding: 5px 0;;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ServiceCardSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;
export const ServiceCardSwiperSlide = styled(SwiperSlide)`
`;