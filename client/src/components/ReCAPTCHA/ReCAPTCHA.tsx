"use client";

import { Box } from "@radix-ui/themes";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { config } from "@/utils/config";

const GoogleReCAPTCHA = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch("/api/recaptcha", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        setIsVerified(true);
      }
    } catch (error) {
      console.log(error);
      setIsVerified(false);
    }
  }
  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  function handleExpired() {
    setIsVerified(false);
  }
  return (
    <Box>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={config.RECAPTCHA_FRONTNED_SITE_KEY}
        onChange={handleChange}
        onExpired={handleExpired}
      />
      <button
        type="submit"
        disabled={!isVerified}
      >
        Submit Form
      </button>
    </Box>
  );
};

export default GoogleReCAPTCHA;
