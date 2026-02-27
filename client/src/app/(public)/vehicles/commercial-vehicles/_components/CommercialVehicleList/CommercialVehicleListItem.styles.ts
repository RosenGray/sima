"use client";
import styled from "styled-components";
import { Box, Card, Flex } from "@radix-ui/themes";
import { breakpoints } from "@/globals";

export const CommercialVehicleListItemBox = styled(Box)`
  width: 100%;
  border-radius: var(--radius-3);
  overflow: hidden;
  font-family: inherit;
`;

export const CommercialVehicleListItemCard = styled(Card)`
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-shadow: inset var(--shadow-4);
  position: relative;

  @media (min-width: ${breakpoints.sm}px) {
    flex-direction: row;
  }
`;

export const CommercialVehicleListItemImageSection = styled(Box)`
  width: 100%;
  height: 180px;
  flex-shrink: 0;
  position: relative;
  background: var(--gray-3);

  @media (min-width: ${breakpoints.sm}px) {
    width: 35%;
    min-width: 200px;
    max-width: 280px;
    height: 200px;
  }
`;

export const CommercialVehicleListItemImageContainer = styled(Box)`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const CommercialVehicleListItemDetails = styled(Flex)`
  flex: 1;
  flex-direction: column;
  padding: var(--space-3);
  gap: var(--space-2);
  min-width: 0;
  position: relative;
`;

export const CommercialVehicleListItemLikeWrapper = styled.div`
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  z-index: 1;
`;

export const CommercialVehicleListItemBadges = styled(Flex)`
  flex-wrap: wrap;
  gap: var(--space-1);
  align-items: center;
`;
