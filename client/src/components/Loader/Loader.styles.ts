import styled, { keyframes } from 'styled-components';

interface LoaderContainerProps {
  size: 'small' | 'medium' | 'large' | 'xlarge';
  color: string;
}

interface LoaderCircleProps {
  color: string;
}

// Keyframe for the scaling animation of the letter S
const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

// Keyframe for the subtle rotation of the entire loader
const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Size mapping for different loader sizes
const getSize = (size: 'small' | 'medium' | 'large' | 'xlarge') => {
  switch (size) {
    case 'small':
      return '32px';
    case 'large':
      return '80px';
    case 'xlarge':
      return '120px';
    case 'medium':
    default:
      return '48px';
  }
};

// Font size mapping based on loader size
const getFontSize = (size: 'small' | 'medium' | 'large' | 'xlarge') => {
  switch (size) {
    case 'small':
      return '16px';
    case 'large':
      return '40px';
    case 'xlarge':
      return '60px';
    case 'medium':
    default:
      return '24px';
  }
};

export const LoaderContainer = styled.div<LoaderContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => getSize(props.size)};
  height: ${props => getSize(props.size)};
  position: relative;
`;

export const LoaderCircle = styled.div<LoaderCircleProps>`
  width: 100%;
  height: 100%;
  border: 2px solid ${props => props.color}20; /* 20% opacity */
  border-top: 2px solid ${props => props.color};
  border-radius: 50%;
  animation: ${rotateAnimation} 1.5s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const LoaderLetter = styled.span<{ size: 'small' | 'medium' | 'large' | 'xlarge' }>`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 700;
  font-size: ${props => getFontSize(props.size)};
  color: var(--accent-9);
  animation: ${scaleAnimation} 1.2s ease-in-out infinite;
  line-height: 1;
  user-select: none;
  z-index: 1;
`;

// Add the size prop to LoaderLetter by extending the styled component
export const LoaderLetterWithSize = styled(LoaderLetter)``;
