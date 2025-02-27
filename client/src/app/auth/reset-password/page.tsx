import { getUserSessionData } from "@/utils/auth";
import ResetPasswordForm from "./ResetPasswordForm";
import { redirect } from "next/navigation";

const ResetPasswordPage = async () => {
  const userSession = await getUserSessionData();
  if (userSession && userSession.isSessionValid) {
    return redirect("/auth/success");
  }
  return <ResetPasswordForm />;
};

export default ResetPasswordPage;
