"use client";

import { useState, useEffect } from "react";
import { Flex, Text, Button, IconButton } from "@radix-ui/themes";
import { Cross2Icon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { resendVerificationEmail } from "@/lib/auth/actions/resendVerificationEmail";
import {
  BannerContainer,
  BannerContent,
  IconWrapper,
  ContentWrapper,
  ActionsWrapper,
} from "./EmailVerificationBanner.styles";

interface EmailVerificationBannerProps {
  userEmail: string;
}

const EmailVerificationBanner = ({
  userEmail,
}: EmailVerificationBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if banner was dismissed in this session
    const isDismissed = sessionStorage.getItem(
      "emailVerificationBannerDismissed"
    );
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("emailVerificationBannerDismissed", "true");
  };

  const handleResend = async () => {
    setIsLoading(true);
    setMessage("");

    const result = await resendVerificationEmail(userEmail);
    setMessage(result.message);
    setIsLoading(false);

    if (result.success) {
      setTimeout(() => setMessage(""), 5000);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <BannerContainer>
      <BannerContent align="center" justify="between">
        <Flex align="center" gap="3" style={{ flex: 1 }}>
          <IconWrapper>
            <EnvelopeClosedIcon width={18} height={18} />
          </IconWrapper>
          <ContentWrapper direction="column">
            <Text size="2" weight="medium" style={{ color: "var(--gray-12)" }}>
              Пожалуйста, подтвердите ваш email
            </Text>
            <Text size="1" style={{ color: "var(--gray-11)" }}>
              Мы отправили письмо с подтверждением на{" "}
              <Text weight="medium" style={{ color: "var(--amber-11)" }}>
                {userEmail}
              </Text>
            </Text>
            {message && (
              <Text
                size="1"
                weight="medium"
                style={{
                  color: message.includes("отправлено")
                    ? "var(--green-11)"
                    : "var(--red-11)",
                  marginTop: "0.25rem",
                }}
              >
                {message}
              </Text>
            )}
          </ContentWrapper>
        </Flex>
        <ActionsWrapper>
          <Button
            size="2"
            variant="soft"
            color="amber"
            onClick={handleResend}
            disabled={isLoading}
            style={{ cursor: "pointer" }}
          >
            {isLoading ? "Отправка..." : "Отправить заново"}
          </Button>
          <IconButton
            size="2"
            variant="ghost"
            color="gray"
            onClick={handleDismiss}
            aria-label="Закрыть"
            style={{ cursor: "pointer" }}
          >
            <Cross2Icon />
          </IconButton>
        </ActionsWrapper>
      </BannerContent>
    </BannerContainer>
  );
};

export default EmailVerificationBanner;
