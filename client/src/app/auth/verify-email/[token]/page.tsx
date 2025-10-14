"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/lib/auth/actions/verifyEmail";
import { resendVerificationEmail } from "@/lib/auth/actions/resendVerificationEmail";
import { VerificationTokenValidationReason } from "@/lib/auth/types/verification.types";
import { Box, Button, Flex, Text, TextField, Heading } from "@radix-ui/themes";
import { CheckIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import Loader from "@/components/Loader";

interface VerifyEmailPageProps {
  params: Promise<{ token: string }>;
}

export default function VerifyEmailPage({ params }: VerifyEmailPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
    reason?: VerificationTokenValidationReason;
  } | null>(null);
  const [email, setEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const handleVerification = async (tokenValue: string) => {
    setLoading(true);
    const result = await verifyEmail(tokenValue);
    setVerificationResult(result);
    setLoading(false);

    if (result.success) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  useEffect(() => {
    params.then(({ token: tokenValue }) => {
      handleVerification(tokenValue);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setResendLoading(true);
    setResendMessage("");

    const result = await resendVerificationEmail(email);
    setResendMessage(result.message);
    setResendLoading(false);

    if (result.success) {
      setEmail("");
    }
  };

  if (loading) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{ minHeight: "60vh" }}
        gap="4"
      >
        <Loader size="large" />
        <Text size="4">Подтверждение email...</Text>
      </Flex>
    );
  }

  if (!verificationResult) {
    return null;
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ minHeight: "60vh", padding: "20px" }}
      gap="4"
    >
      <Box
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "40px",
          backgroundColor: "var(--color-panel)",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        {verificationResult.success ? (
          <Flex direction="column" align="center" gap="4">
            <CheckIcon width={64} height={64} color="green" />
            <Heading size="6">Успешно!</Heading>
            <Text size="3" color="gray">
              {verificationResult.message}
            </Text>
            <Text size="2" color="gray">
              Вы будете перенаправлены на главную страницу через несколько секунд...
            </Text>
          </Flex>
        ) : (
          <Flex direction="column" align="center" gap="4">
            <CrossCircledIcon width={64} height={64} color="red" />
            <Heading size="6">Ошибка подтверждения</Heading>
            <Text size="3" color="gray">
              {verificationResult.message}
            </Text>

            {verificationResult.reason === VerificationTokenValidationReason.TokenExpired && (
              <Box style={{ width: "100%", marginTop: "20px" }}>
                <Text size="3" weight="bold" style={{ marginBottom: "10px" }}>
                  Отправить новое письмо с подтверждением
                </Text>
                <form onSubmit={handleResendVerification}>
                  <Flex direction="column" gap="3">
                    <TextField.Root
                      type="email"
                      placeholder="Введите ваш email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      size="3"
                    />
                    <Button
                      type="submit"
                      disabled={resendLoading || !email}
                      size="3"
                    >
                      {resendLoading ? "Отправка..." : "Отправить"}
                    </Button>
                    {resendMessage && (
                      <Text
                        size="2"
                        color={resendMessage.includes("отправлено") ? "green" : "red"}
                      >
                        {resendMessage}
                      </Text>
                    )}
                  </Flex>
                </form>
              </Box>
            )}

            {verificationResult.reason === VerificationTokenValidationReason.AlreadyVerified && (
              <Button
                size="3"
                onClick={() => router.push("/")}
                style={{ marginTop: "10px" }}
              >
                Перейти на главную
              </Button>
            )}
          </Flex>
        )}
      </Box>
    </Flex>
  );
}

