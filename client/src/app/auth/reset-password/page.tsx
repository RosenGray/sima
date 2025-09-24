import { FC } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import ResetPasswordForm from "../_components/ResetPasswordForm/ResetPasswordForm";


const ResetPasswordPage: FC = async () => {
  const user = await getCurrentUser();
  if (user) {
    return redirect("/auth/success");
  }
  return <ResetPasswordForm />
};

export default ResetPasswordPage;
