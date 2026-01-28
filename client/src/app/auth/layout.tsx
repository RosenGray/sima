import { FC, ReactNode } from "react";
import { AuthLayoutContainer, AuthLayoutFlex } from "./layout.styles";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <AuthLayoutContainer px="10px">
      <AuthLayoutFlex justify="center" align="center">
        {children}
      </AuthLayoutFlex>
    </AuthLayoutContainer>
  );
};

export default AuthLayout;
