// import RegisterPageForm from "./RegisterPageForm";
// import { redirect } from "next/navigation";
// import { getUserSessionData } from "@/utils/auth";
import { FC } from "react";
import RegisterPageForm from "../_components/RegisterForm/RegisterForm";


const LoginPage: FC = async () => {
  // const userSession = await getUserSessionData();
  // if (userSession && userSession.isSessionValid) {
  //   return redirect("/auth/success");
  // }
  return <RegisterPageForm />
};

export default LoginPage;
