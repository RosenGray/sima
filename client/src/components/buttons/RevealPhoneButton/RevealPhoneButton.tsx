"use client";
import { useState } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { MobileIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { recordPhoneReveal } from "@/lib/phone-reveals/actions/phone-reveals.actions";
import { EntityType } from "@/lib/constants/entityTypes";

interface RevealPhoneButtonProps {
  primaryPhone: string;
  secondaryPhone?: string;
  isAuthenticated: boolean;
  isOwner: boolean;
  entityType: EntityType;
  entityPublicId: string;
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
  entityType,
  entityPublicId,
}) => {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    console.log("Revealing phone number", entityType, entityPublicId);
    recordPhoneReveal(entityType, entityPublicId);
  };

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
        onClick={handleReveal}
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
