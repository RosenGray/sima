import LoginFormPage from "./LoginFormPage";
import { type NextPage } from 'next';
import { redirect } from "next/navigation";
import { getUserSessionData } from "@/utils/auth";

interface LoginPageProps {
  searchParams: {
    redirect?: string;
  };
}

const LoginPage: NextPage<LoginPageProps> = async (params) => {
  const redirectPath = params.searchParams?.redirect;
  const userSession = await getUserSessionData();
  if (userSession && userSession.isSessionValid) {
    return redirect(redirectPath || "/auth/success");
  }

  return <LoginFormPage />;
};

export default LoginPage;
