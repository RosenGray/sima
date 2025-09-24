import React from 'react';
import * as Styled from './Loader.styles';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium', 
  color = 'var(--accent-9)', 
  className 
}) => {
  return (
    <Styled.LoaderContainer 
      size={size} 
      color={color} 
      className={className}
      role="status"
      aria-label="Loading"
    >
      <Styled.LoaderCircle color={color}>
        <Styled.LoaderLetter size={size}>S</Styled.LoaderLetter>
      </Styled.LoaderCircle>
    </Styled.LoaderContainer>
  );
};

export default Loader;
