import { cookies } from "next/headers";
import LoginFormPage from "./LoginFormPage";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const sessionCookie = cookies().get("sima-auth-session");
  if (sessionCookie) {
    return redirect("/auth/success");
  }

  return <LoginFormPage />;
};

export default LoginPage;
