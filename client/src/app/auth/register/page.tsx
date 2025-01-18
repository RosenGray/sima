import { cookies } from "next/headers";
import RegisterPageForm from "./RegisterPageForm";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  const sessionCookie = cookies().get("sima-auth-session");
  if (sessionCookie) {
    return redirect("/auth/success");
  }
  return <RegisterPageForm />;
};

export default RegisterPage;
