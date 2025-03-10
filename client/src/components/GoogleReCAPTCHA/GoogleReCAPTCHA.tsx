"use client";

import React, { FC, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { config } from "@/utils/config";
import { useTheme } from "next-themes";
import { Box, Text } from "@radix-ui/themes";
import styles from "./GoogleReCAPTCHA.module.scss";
import { SubmitButton } from "../buttons/SubmitButton/SubmitButton";

interface ReCAPTCHAProps {
  showText?: boolean;
  submitButtonText?: string;
  isLoading?: boolean;
}

const GoogleReCAPTCHA: FC<ReCAPTCHAProps> = ({
  showText = false,
  submitButtonText,
  isLoading = false,
}) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { theme } = useTheme();

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        setIsPending(true);
        await fetch("/api/recaptcha", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        setIsVerified(true);
        setIsPending(false);
      }
    } catch (error) {
      console.log(error);
      setIsVerified(false);
      setIsPending(false);
    }
  }
  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  function handleExpired() {
    setIsVerified(false);
  }
  return (
    <Box className={styles.GoogleReCAPTCHA}>
      <style>
        {`iframe{
            border-radius: 10px;
            border:1px solid var(--hero-card-background-color);
            width: 155px;
            height: 138px;
            }
        .ReCAPTCHA{
          // width:100%;
          // height:100%;
            // display:inline-block;
     
          }
                `}
      </style>
      {showText && (
        <Text className={styles.GoogleReCAPTCHA__Text} size="1" color="gray">
          Подтвердите, что вы не робот
        </Text>
      )}
      <ReCAPTCHA
        theme={theme === "dark" ? "dark" : "light"}
        size="compact"
        hl="ru"
        className="ReCAPTCHA"
        ref={recaptchaRef}
        sitekey={config.RECAPTCHA_FRONTNED_SITE_KEY}
        onChange={handleChange}
        onExpired={handleExpired}
      />
      <SubmitButton
        style={{ width: "100%" }}
        pending={isPending || isLoading}
        disabled={!isVerified}
        text={submitButtonText}
      />
    </Box>
  );
};

export default GoogleReCAPTCHA;
