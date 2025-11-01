import { FC } from "react";
import RegisterPageForm from "../_components/RegisterForm/RegisterForm";

const LoginPage: FC = async () => {
  // const user = await getCurrentUser();
  // if (user) return notFound();
  return <RegisterPageForm />;
};

export default LoginPage;
