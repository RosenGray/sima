import styled from "styled-components";
import { Box, Flex } from "@radix-ui/themes";
import { breakpoints } from "@/globals";

export const BannerContainer = styled(Box)`
  position: fixed;

  left: 0;
  right: 0;
  z-index: 9999999;
  background: var(--color-background);



  

`;

export const BannerContent = styled(Flex)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  gap: 1rem;

  @media (max-width: ${breakpoints.sm}px) {
    flex-direction: column;
    padding: 1rem;
    gap: 0.75rem;
  }
`;

export const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-2);
  background: var(--amber-3);
  color: var(--amber-11);
  flex-shrink: 0;

  @media (max-width: ${breakpoints.sm}px) {
    width: 2rem;
    height: 2rem;
  }
`;

export const ContentWrapper = styled(Flex)`
  flex: 1;
  gap: 0.5rem;
`;

export const ActionsWrapper = styled(Flex)`
  gap: 0.5rem;
  align-items: center;

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

