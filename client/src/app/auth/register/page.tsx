import RegisterPageForm from "./RegisterPageForm";
import { redirect } from "next/navigation";
import { getUserSessionData } from "@/utils/auth";

const RegisterPage = async () => {
  const userSession = await getUserSessionData();
  if (userSession && userSession.isSessionValid) {
    return redirect("/auth/success");
  }
  return <RegisterPageForm />;
};

export default RegisterPage;
