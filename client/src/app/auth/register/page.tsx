import { FC } from "react";
import RegisterPageForm from "../_components/RegisterForm/RegisterForm";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";


const LoginPage: FC = async () => {
  const user = await getCurrentUser();
  if (user) {
    return redirect("/auth/success");
  }
  return <RegisterPageForm />
};

export default LoginPage;
