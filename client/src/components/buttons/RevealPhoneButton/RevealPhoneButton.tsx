"use client";
import { useState } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { MobileIcon, EyeOpenIcon } from "@radix-ui/react-icons";

interface RevealPhoneButtonProps {
  primaryPhone: string;
  secondaryPhone?: string;
  isAuthenticated: boolean;
  isOwner: boolean;
}

const itemStyle = {
  alignItems: "center",
  gap: "var(--space-3)",
  padding: "var(--space-3)",
  borderRadius: "var(--radius-3)",
  background: "var(--gray-2)",
  marginBottom: "var(--space-3)",
};

const RevealPhoneButton: React.FC<RevealPhoneButtonProps> = ({
  primaryPhone,
  secondaryPhone,
  isAuthenticated,
  isOwner,
}) => {
  const [revealed, setRevealed] = useState(false);

  if (!isAuthenticated) {
    return (
      <Flex style={itemStyle}>
        <MobileIcon width="18" height="18" />
        <Text size="2" color="gray">
          Войдите, чтобы увидеть номер телефона
        </Text>
      </Flex>
    );
  }

  if (!revealed && !isOwner) {
    return (
      <Button
        variant="soft"
        size="3"
        onClick={() => setRevealed(true)}
        style={{ width: "100%" }}
      >
        <EyeOpenIcon width="18" height="18" />
        Показать номер телефона
      </Button>
    );
  }

  return (
    <>
      <Flex style={itemStyle}>
        <MobileIcon width="18" height="18" />
        <Text size="3" weight="bold">
          {primaryPhone}
        </Text>
      </Flex>
      {secondaryPhone && (
        <Flex style={itemStyle}>
          <MobileIcon width="18" height="18" />
          <Text size="3" weight="bold">
            {secondaryPhone}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default RevealPhoneButton;
