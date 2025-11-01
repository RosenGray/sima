import styled from "styled-components";
import { Box, Text } from "@radix-ui/themes";

export const ReCaptchaWrapper = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ReCaptchaText = styled(Text)`
  white-space: nowrap;
  position: relative;
  left: -15px;
  color: var(--gray-13);
  font-weight: bold;
  display: inline-block;
  margin-bottom: 10px;
`;