"use client";
import styled from "styled-components";

export const ChatLayoutSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  &:before {
    content: "";
    display: block;
    height: var(--header-height);
  }
  & main {
   flex: 1;
  }
`;
