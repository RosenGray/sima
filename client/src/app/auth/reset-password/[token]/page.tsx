import { ServerErrorType } from "@sima-board/common";
import ReplacePasswordFormPage from "./ReplacePasswordFormPage";
import { verifyResetToken } from "../../_lib/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface TokenPageProps {
  params: {
    token: string;
  };
}

const TokenPage = async ({ params }: TokenPageProps) => {
  const sessionCookie = cookies().get("sima-auth-session");
  if (sessionCookie) {
    return redirect("/auth/success");
  }
  const { token } = params;

  const response = await verifyResetToken(token);
  if (!response.ok) {
    const error = await response.json();
    switch (error.errorType) {
      case ServerErrorType.AuthTokenNotFound:
        return <h1>Токен не найден</h1>;
      case ServerErrorType.AuthTokenExpired:
        return <h1>Срок действия токена истек</h1>;
      case ServerErrorType.AuthInvalidToken:
        return <h1>Недействительный токен</h1>;
      default:
        return <h1>Произошла ошибка</h1>;
    }
    return <h1>Недействительный токен</h1>;
  }

  return <ReplacePasswordFormPage token={token} />;
};

export default TokenPage;
