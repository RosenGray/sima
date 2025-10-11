import { FC } from "react";
import LoginForm from "../_components/LoginForm/LoginForm";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";

interface LoginPageProps {
  searchParams: Promise<{ redirectTo?: string }>;
}

const LoginPage: FC<LoginPageProps> = async ({ searchParams }) => {
  const { redirectTo } = await searchParams;
  const user = await getCurrentUser();
  if (user) {
    return redirect(redirectTo || "/auth/success");
  }
  return <LoginForm />;
};

export default LoginPage;
