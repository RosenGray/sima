"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import { SubmitButton } from "../buttons/SubmitButton/SubmitButton";
import { ReCaptchaText, ReCaptchaWrapper } from "./GoogleReCAPTCHA.styles";

declare global {
  const grecaptcha: {
    enterprise: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  };
}

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

  // Reset verification state when theme changes
  useEffect(() => {
    setIsVerified(false);
    setIsPending(false);
  }, [theme]);

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        setIsPending(true);
        const response = await fetch("/api/recaptcha", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const r = await response.json();
        console.log(r);
        if(r.success){
          setIsVerified(true);
          setIsPending(false);
        }else{
          setIsVerified(false);
          setIsPending(false);
        }
       
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
    <ReCaptchaWrapper>
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
        <ReCaptchaText size="1" color="gray">
          Подтвердите, что вы не робот
        </ReCaptchaText>
      )}
      <ReCAPTCHA
        key={theme}
        theme={theme === "dark" ? "dark" : "light"}
        size="compact"
        hl="ru"
        className="ReCAPTCHA"
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_FRONTNED_SITE_KEY || ""}
        onChange={handleChange}
        onExpired={handleExpired}
      />
      <SubmitButton
        // style={{ width: "100%" }}
        pending={isPending || isLoading}
        disabled={!isVerified}
        text={submitButtonText}
      />
    </ReCaptchaWrapper>
  );
};

export default GoogleReCAPTCHA;
