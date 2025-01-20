import { cookies } from "next/headers";
import ResetPasswordForm from "./ResetPasswordForm";
import { redirect } from "next/navigation";

const ResetPasswordPage = () => {
  const sessionCookie = cookies().get("sima-auth-session");
  if (sessionCookie) {
    return redirect("/auth/success");
  }
  return <ResetPasswordForm/>
};

export default ResetPasswordPage;
