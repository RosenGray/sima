import { FC } from "react";
import LoginForm from "../_components/LoginForm/LoginForm";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { notFound } from "next/navigation";

const LoginPage: FC = async () => {
  const user = await getCurrentUser();
  if (user) return notFound();
  return <LoginForm />;
};

export default LoginPage;
