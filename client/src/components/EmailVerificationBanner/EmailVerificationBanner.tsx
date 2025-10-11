"use client";

import { useState, useEffect } from "react";
import { Flex, Text, Button, IconButton } from "@radix-ui/themes";
import { Cross2Icon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { resendVerificationEmail } from "@/lib/auth/actions/resendVerificationEmail";
import {
  BannerContainer,
  BannerContent,
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
      <BannerContent>
        <Flex align="center" gap="3" style={{ flex: 1 }}>
          <EnvelopeClosedIcon width={20} height={20} />
          <Flex direction="column" gap="1" style={{ flex: 1 }}>
            <Text size="2" weight="bold">
              Пожалуйста, подтвердите ваш email
            </Text>
            <Text size="1" style={{ opacity: 0.8 }}>
              Мы отправили письмо с подтверждением на {userEmail}. Проверьте
              вашу почту.
            </Text>
            {message && (
              <Text
                size="1"
                color={message.includes("отправлено") ? "green" : "red"}
                style={{ marginTop: "4px" }}
              >
                {message}
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex align="center" gap="2">
          <Button
            size="4"
            variant="ghost"
            color="blue"
            onClick={handleResend}
            disabled={isLoading}
          >
            {isLoading ? "Отправка..." : "Отправить заново"}
          </Button>
          <IconButton
            color="blue"
            size="4"
            variant="ghost"
            onClick={handleDismiss}
            aria-label="Закрыть"
          >
            <Cross2Icon />
          </IconButton>
        </Flex>
      </BannerContent>
    </BannerContainer>
  );
};

export default EmailVerificationBanner;
