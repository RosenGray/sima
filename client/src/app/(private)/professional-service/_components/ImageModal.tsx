"use client";
import React from "react";
import Image from "next/image";
import { Dialog, Flex, IconButton } from "@radix-ui/themes";
import {
  Cross2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import styled from "styled-components";

const ModalContent = styled(Dialog.Content)`
  max-width: 95vw;
  max-height: 95vh;
  padding: 0;
  background: transparent;
  box-shadow: none;
`;

const ImageContainer = styled(Flex)`
  position: relative;
  width: 90vw;
  height: 90vh;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
`;

const NavigationButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: var(--gray-12);
  color: var(--gray-1);

  &:hover {
    background: var(--gray-11);
  }
`;

const PrevButton = styled(NavigationButton)`
  left: var(--space-3);
`;

const NextButton = styled(NavigationButton)`
  right: var(--space-3);
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  z-index: 10;
  background: var(--gray-12);
  color: var(--gray-1);

  &:hover {
    background: var(--gray-11);
  }
`;

interface ImageModalProps {
  images: Array<{
    url: string;
    originalName: string;
    uniqueName: string;
  }>;
  currentIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (index: number) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  currentIndex,
  open,
  onOpenChange,
  onNavigate,
}) => {
  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onNavigate(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  };

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <Dialog.Title>Image</Dialog.Title>
        <Dialog.Description>Image</Dialog.Description>
        <ImageContainer>
          <CloseButton
            size="3"
            variant="solid"
            onClick={() => onOpenChange(false)}
            aria-label="Close modal"
          >
            <Cross2Icon width="20" height="20" />
          </CloseButton>

          {images.length > 1 && (
            <>
              <PrevButton
                size="3"
                variant="solid"
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                <ChevronLeftIcon width="24" height="24" />
              </PrevButton>

              <NextButton
                size="3"
                variant="solid"
                onClick={handleNext}
                aria-label="Next image"
              >
                <ChevronRightIcon width="24" height="24" />
              </NextButton>
            </>
          )}

          <StyledImage
            src={currentImage.url}
            alt={currentImage.originalName}
            fill
            sizes="90vw"
            priority
          />
        </ImageContainer>
      </ModalContent>
    </Dialog.Root>
  );
};

export default ImageModal;
