"use client";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const LoadingContainer = styled.div`
  padding: var(--space-4);
`;

export const LoadingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-4);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const LoadingCard = styled.div`
  background: var(--gray-2);
  border-radius: var(--radius-4);
  overflow: hidden;
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

export const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(
    90deg,
    var(--gray-4) 0px,
    var(--gray-5) 40px,
    var(--gray-4) 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: var(--radius-3);
`;

export const CardTitle = styled.div`
  width: 70%;
  height: 24px;
  background: linear-gradient(
    90deg,
    var(--gray-4) 0px,
    var(--gray-5) 40px,
    var(--gray-4) 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: var(--radius-2);
`;

export const CardDescription = styled.div`
  width: 100%;
  height: 16px;
  background: linear-gradient(
    90deg,
    var(--gray-4) 0px,
    var(--gray-5) 40px,
    var(--gray-4) 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: var(--radius-2);
  
  &:last-of-type {
    width: 60%;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: var(--space-3);
  gap: var(--space-3);
`;

export const CardPrice = styled.div`
  width: 100px;
  height: 24px;
  background: linear-gradient(
    90deg,
    var(--gray-4) 0px,
    var(--gray-5) 40px,
    var(--gray-4) 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: var(--radius-2);
`;

export const CardButton = styled.div`
  width: 80px;
  height: 32px;
  background: linear-gradient(
    90deg,
    var(--gray-4) 0px,
    var(--gray-5) 40px,
    var(--gray-4) 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: var(--radius-2);
`;
