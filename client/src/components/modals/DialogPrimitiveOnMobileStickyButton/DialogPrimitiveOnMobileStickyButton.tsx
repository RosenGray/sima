"use client";
import { FC, ReactNode, useRef, useEffect, useState, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, IconButton, Text } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  DialogPrimitiveOnMobileStickyButtonContent,
  DialogPrimitiveOnMobileStickyButtonOverlay,
  DialogContentContainer,
  DialogPrimitiveButtonTitle,
  DialogHeader,
} from "./DialogPrimitiveOnMobileStickyButton.styles";
import { Responsive } from "@radix-ui/themes/dist/esm/props/prop-def.js";
import { usePortalTarget } from "@/providers/PortalProvider/PortalProvider";

interface DialogPrimitiveOnMobileStickyButtonProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  maxWidth?: Responsive<string>;
  titleIsVisible?: boolean;
  subtitleIsVisible?: boolean;
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

const DialogPrimitiveOnMobileStickyButton: FC<
  DialogPrimitiveOnMobileStickyButtonProps
> = ({
  children,
  title,
  maxWidth,
  buttonVariant = "outline",
  buttonSize = "3",
  buttonColor = "gray",
  titleIsVisible = true,
  showOverlay = true,
  subtitle,
}) => {
    const { portalTarget } = usePortalTarget();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ top: 0, right: 0 });
    const [isMobile, setIsMobile] = useState(false);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }, []);

    const updatePosition = useCallback(() => {
      if (buttonRef.current && !isMobile) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + 8, // 8px gap below button (viewport coordinates)
          right: window.innerWidth - rect.right, // Align right edge of dialog with right edge of button
        });
      }
    }, [isMobile]);

    useEffect(() => {
      if (isModalOpen) {
        if (!isMobile) {
          updatePosition();

          // Update position on scroll or resize
          window.addEventListener("scroll", updatePosition, true);
          window.addEventListener("resize", updatePosition);

          return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
          };
        }
      }
    }, [isModalOpen, isMobile, updatePosition]);

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
            {subtitle && <Text size="2" color="gray">{subtitle}</Text>}  <Text>{title}</Text>
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal container={portalTarget}>
          {showOverlay && <DialogPrimitiveOnMobileStickyButtonOverlay />}
          <DialogPrimitiveOnMobileStickyButtonContent
            style={{
              position: "fixed",
              ...(isMobile
                ? {
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: "auto",
                  maxWidth: "100%",
                  width: "100%",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }
                : {
                  top: `${position.top}px`,
                  right: `${position.right}px`,
                  maxWidth: getMaxWidthStyle(),
                }),
            }}
          >
            <DialogHeader>
              {renderDialogTitle()}
              {isMobile && (
                <IconButton
                  variant="ghost"
                  color="gray"
                  onClick={() => handleOpenChange(false)}
                  size="3"
                >
                  <Cross2Icon width="20" height="20" />
                </IconButton>
              )}
            </DialogHeader>
            <Dialog.Description asChild>
              <VisuallyHidden.Root>Содержимое диалога</VisuallyHidden.Root>
            </Dialog.Description>
            <DialogContentContainer>{children}</DialogContentContainer>
          </DialogPrimitiveOnMobileStickyButtonContent>
        </Dialog.Portal>
      </Dialog.Root>
    );
  };

export default DialogPrimitiveOnMobileStickyButton;
