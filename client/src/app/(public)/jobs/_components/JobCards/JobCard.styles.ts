"use client";
import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

export const JobCardBox = styled(Box)`
  width: 100%;
  height: 100%;
  border-radius: var(--radius-3);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
`;

export const JobCard = styled(Card)`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  box-shadow: inset var(--shadow-4);
`;

export const JobCardHeader = styled.header`
  width: 100%;
  padding: var(--space-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
`;

export const JobCardImages = styled(Box)`
  width: 100%;
  height: 200px;
  flex-shrink: 0;
`;

export const JobCardImageContainer = styled(Box)`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const JobCardContent = styled(Flex)`
  flex: 1;
  flex-direction: column;
  padding: var(--space-3);
  gap: var(--space-2);
`;

export const JobCardFooter = styled.footer`
  width: 100%;
  padding: var(--space-2) var(--space-3);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  align-items: center;
`;

export const JobCardSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

export const JobCardSwiperSlide = styled(SwiperSlide)``;
