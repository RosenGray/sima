import { FC } from "react";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import {
  TokenValidationReason,
  validateToken,
} from "@/lib/auth/services/TokenManager/TokenManager";
import ReplacePasswordFormPage from "../../_components/ReplacePasswordForm/ReplacePasswordFormPage";

interface TokenPageProps {
  params: Promise<{ token: string }>;
}

const TokenPage: FC<TokenPageProps> = async ({ params }) => {
  const user = await getCurrentUser();
  if (user) {
    return redirect("/auth/success");
  }
  const { token } = await params;

  const { reason, isValid } = await validateToken(token);
  if (!isValid) {
    switch (reason) {
      case TokenValidationReason.TokenNotFound:
        return <h1>Токен не найден</h1>;
      case TokenValidationReason.TokenExpired:
        return <h1>Срок действия токена истек</h1>;
      case TokenValidationReason.InvalidToken:
        return <h1>Недействительный токен</h1>;
    }
  }

  return <ReplacePasswordFormPage token={token} />;
};

export default TokenPage;
