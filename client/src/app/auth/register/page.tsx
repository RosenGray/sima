import { FC } from "react";
import RegisterPageForm from "../_components/RegisterForm/RegisterForm";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";

const LoginPage: FC = async () => {
  const user = await getCurrentUser();
  if (user) return notFound();
  return <RegisterPageForm />;
};

export default LoginPage;
