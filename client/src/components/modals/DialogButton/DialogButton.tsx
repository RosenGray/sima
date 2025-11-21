"use client";
import { FC, ReactNode, useRef, useEffect, useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { useFiltersModal } from "@/components/filters/FiltersContext";
import { DialogButtonContent } from "./DialogButton.styles";

interface DialogButtonProps {
  children: ReactNode;
  title: string;
  buttonVariant?: "solid" | "soft" | "outline" | "ghost" | "surface" | "classic";
  buttonSize?: "1" | "2" | "3" | "4";
  buttonColor?: "gray" | "gold" | "bronze" | "brown" | "yellow" | "amber" | "orange" | "tomato" | "red" | "ruby" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "green" | "grass" | "lime" | "mint" | "sky";
}

const DialogButton: FC<DialogButtonProps> = ({
  children,
  title,
  buttonVariant = "outline",
  buttonSize = "3",
  buttonColor = "gray",
}) => {
  const { isModalOpen, openModal, closeModal } = useFiltersModal();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8, // 8px gap below button (viewport coordinates)
        right: window.innerWidth - rect.right, // Align right edge of dialog with right edge of button
      });
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      updatePosition();
      
      // Update position on scroll or resize
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isModalOpen]);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openModal();
    } else {
      closeModal();
    }
  };

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>
        <Button
          ref={buttonRef}
          variant={buttonVariant}
          size={buttonSize}
          color={buttonColor}
        >
          {title}
        </Button>
      </Dialog.Trigger>
      <DialogButtonContent
        style={{
          position: "fixed",
          top: `${position.top}px`,
          right: `${position.right}px`,
        }}
      >
        {children}
      </DialogButtonContent>
    </Dialog.Root>
  );
};

export default DialogButton;

