"use client";
import { FC, ReactNode, useRef, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  DialogPrimitiveButtonContent,
  DialogPrimitiveButtonOverlay,
  DialogContentContainer,
  DialogPrimitiveButtonTitle,
} from "./DialogPrimitiveButton.styles";
import { Responsive } from "@radix-ui/themes/dist/esm/props/prop-def.js";
import { usePortalTarget } from "@/providers/PortalProvider/PortalProvider";

interface DialogPrimitiveButtonProps {
  children: ReactNode;
  title: string;
  maxWidth?: Responsive<string>;
  titleIsVisible?: boolean;
  showOverlay?: boolean;
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

const DialogPrimitiveButton: FC<DialogPrimitiveButtonProps> = ({
  children,
  title,
  maxWidth,
  buttonVariant = "outline",
  buttonSize = "3",
  buttonColor = "gray",
  titleIsVisible = true,
  showOverlay = true,
}) => {
  const { portalTarget } = usePortalTarget();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(open);
  };

  const renderDialogTitle = () => {
    // Use Dialog.Title for accessibility, but style it to match Radix UI Themes
    const titleElement = titleIsVisible ? (
      <DialogPrimitiveButtonTitle>{title}</DialogPrimitiveButtonTitle>
    ) : (
      <VisuallyHidden.Root>
        <DialogPrimitiveButtonTitle>{title}</DialogPrimitiveButtonTitle>
      </VisuallyHidden.Root>
    );

    // Also render Dialog.Title for accessibility (screen readers)
    return titleElement;
  };

  // Convert maxWidth Responsive prop to CSS value
  const getMaxWidthStyle = () => {
    if (!maxWidth) return undefined;
    if (typeof maxWidth === "string") return maxWidth;
    // For responsive object, use the initial value or first breakpoint
    return maxWidth.initial || Object.values(maxWidth)[0];
  };

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <Button
          ref={buttonRef}
          variant={buttonVariant}
          size={buttonSize}
          color={buttonColor}
        >
          {title}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal container={portalTarget}>
        {showOverlay && <DialogPrimitiveButtonOverlay />}
        <DialogPrimitiveButtonContent
          style={{
            position: "fixed",
            top: `${position.top}px`,
            right: `${position.right}px`,
            maxWidth: getMaxWidthStyle(),
          }}
        >
          {renderDialogTitle()}
          <DialogContentContainer>{children}</DialogContentContainer>
        </DialogPrimitiveButtonContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogPrimitiveButton;
