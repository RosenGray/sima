"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Content,
  LoginBox,
  Subtitle,
  SuccessBox,
  Title,
} from "./page.styles";
import { CheckIcon } from "@radix-ui/react-icons";
import Loader from "@/components/Loader";
const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(redirectTo || "/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, redirectTo]);

  return (
    <Container>
      <LoginBox>
        <SuccessBox>
          <Loader size="large" />
          <CheckIcon color="green" width={64} height={64} />
          <Content>
            <Title>Ура!</Title>
            <Subtitle>
              Сейчас вы будете перенаправлены на следующую страницу
            </Subtitle>
          </Content>
        </SuccessBox>
      </LoginBox>
    </Container>
  );
};

export default SuccessPage;
