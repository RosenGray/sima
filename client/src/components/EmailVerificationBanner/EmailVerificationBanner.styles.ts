import styled from "styled-components";
import { Box } from "@radix-ui/themes";

export const BannerContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: var(--red-9);
  color: white;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 9999;
`;

export const BannerContent = styled(Box)`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

