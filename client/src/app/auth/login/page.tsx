import LoginFormPage from "./LoginFormPage";

import { redirect } from "next/navigation";
import { getUserSessionData } from "@/utils/auth";
import { FC } from "react";
interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

const LoginPage: FC<LoginPageProps> = async ({ searchParams }) => {
  const { redirect: redirectPath } = await searchParams;

  const userSession = await getUserSessionData();
  if (userSession && userSession.isSessionValid) {
    return redirect(redirectPath || "/auth/success");
  }

  return <LoginFormPage />;
};

export default LoginPage;
