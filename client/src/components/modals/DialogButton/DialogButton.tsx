"use client";
import { FC, ReactNode, useRef, useEffect, useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { VisuallyHidden } from "radix-ui";
import {
  DialogButtonContent,
  DialogContentContainer,
} from "./DialogButton.styles";
import { Responsive } from "@radix-ui/themes/dist/esm/props/prop-def.js";

interface DialogButtonProps {
  children: ReactNode;
  title: string;
  maxWidth?: Responsive<string>;
  titleIsVisible?: boolean;
  buttonVariant?:
    | "solid"
    | "soft"
    | "outline"
    | "ghost"
    | "surface"
    | "classic";
  buttonSize?: "1" | "2" | "3" | "4";
  buttonColor?:
    | "gray"
    | "gold"
    | "bronze"
    | "brown"
    | "yellow"
    | "amber"
    | "orange"
    | "tomato"
    | "red"
    | "ruby"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet"
    | "iris"
    | "indigo"
    | "blue"
    | "cyan"
    | "teal"
    | "jade"
    | "green"
    | "grass"
    | "lime"
    | "mint"
    | "sky";
}

const DialogButton: FC<DialogButtonProps> = ({
  children,
  title,
  maxWidth,
  buttonVariant = "outline",
  buttonSize = "3",
  buttonColor = "gray",
  titleIsVisible = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const _title = <Dialog.Title>{title}</Dialog.Title>;

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
    setIsModalOpen(open);
  };

  const renderDialogTitle = () => {
    if (titleIsVisible) {
      return _title;
    }
    return <VisuallyHidden.Root>{_title}</VisuallyHidden.Root>;
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
        maxWidth={maxWidth}
        style={{
          position: "fixed",
          top: `${position.top}px`,
          right: `${position.right}px`,
        }}
      >
        {renderDialogTitle()}
        <DialogContentContainer>{children}</DialogContentContainer>
      </DialogButtonContent>
    </Dialog.Root>
  );
};

export default DialogButton;
