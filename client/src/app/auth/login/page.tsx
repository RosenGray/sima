// import LoginFormPage from "./LoginFormPage";

// import { redirect } from "next/navigation";
// import { getUserSessionData } from "@/utils/auth";

import { FC } from "react";
import LoginForm from "../_components/LoginForm/LoginForm";
interface LoginPageProps {
  searchParams: { redirect?: string };
}

const LoginPage: FC<LoginPageProps> = async ({ searchParams }) => {
//   const { redirect: redirectPath } = searchParams;

//   const userSession = await getUserSessionData();
//   if (userSession && userSession.isSessionValid) {
//     return redirect(redirectPath || "/auth/success");
//   }

  return <LoginForm />;
};

export default LoginPage;
