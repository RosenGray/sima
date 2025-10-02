import { Box, IconButton } from '@radix-ui/themes';
import styled from 'styled-components';

export const ImagePreviewerContainerBox = styled(Box)`
  border: 2px dashed #7c8ba1;
  padding: 5px;
`;

export const GridItem = styled.div`
  position: relative;
  
  img {
    object-fit: cover;
  }
  
  &:hover {
    border: 2px solid #7c8ba1;
    
    .delete-button {
      opacity: 1;
    }
  }
`;

export const DeleteButton = styled(IconButton)`
  position: absolute;
  top: 5px;
  left: 5px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
  
  &:hover {
    opacity: 1;
  }
`;