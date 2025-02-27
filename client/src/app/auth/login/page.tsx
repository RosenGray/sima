import LoginFormPage from "./LoginFormPage";
import { redirect } from "next/navigation";
import { getUserSessionData } from "@/utils/auth";

const LoginPage = async () => {
  const userSession = await getUserSessionData();
  if (userSession && userSession.isSessionValid) {
    return redirect("/auth/success");
  }

  return <LoginFormPage />;
};

export default LoginPage;
