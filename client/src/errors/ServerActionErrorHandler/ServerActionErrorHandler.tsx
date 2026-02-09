"use client";

import { useEffect, useState } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { UpdateIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Overlay,
  OverlayCard,
  StyledHeading,
  Message,
} from "./ServerActionErrorHandler.styles";

const ServerActionErrorHandler = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showUpdateNotice, setShowUpdateNotice] = useState(false);

  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;

      if (
        error?.message?.includes("Failed to find Server Action") ||
        error?.message?.includes("was not found on the server") ||
        error?.digest?.includes("NEXT_NOT_FOUND")
      ) {
        event.preventDefault();
        setShowUpdateNotice(true);
      }
    };

    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return (
    <>
      {children}
      {showUpdateNotice && (
        <Overlay>
          <OverlayCard>
            <Flex direction="column" align="center" gap="4">
              <UpdateIcon
                color="var(--accent-9)"
                style={{ width: 40, height: 40 }}
              />
              <StyledHeading as="h2" size="6">
                Сайт был обновлён
              </StyledHeading>

              <Message size="3">
                Пока эта вкладка была открыта, мы обновили сайт. Чтобы
                продолжить работу, нажмите кнопку ниже — страница обновится, и
                всё заработает как обычно.
              </Message>

              <Button
                size="4"
                variant="solid"
                color="red"
                style={{ cursor: "pointer", marginTop: "var(--space-2)", padding: ".5em", display: "flex", alignItems: "center", gap: "4px" }}
                onClick={() => window.location.reload()}
              >
                <ReloadIcon width="16" height="16" />
                <Text style={{ color: "var(--accent-12)" }} size="3">
                  Обновить страницу
                </Text>
              </Button>
            </Flex>
          </OverlayCard>
        </Overlay>
      )}
    </>
  );
};

export default ServerActionErrorHandler;
