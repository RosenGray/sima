import { FC, ReactNode } from "react";
import { cookies } from 'next/headers';
import { Container, Flex } from "@radix-ui/themes";
import classes from "./layout.module.scss";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const sessionCookie = cookies().get("sima-auth-session");
  if (sessionCookie) {
    redirect("/");
  }
  return (
    <Container px="10px"  className={classes.AuthLayout}>
      <Flex className={classes.AuthLayout__Flex} justify="center" align="center">
        {children}
      </Flex>
    </Container>
  );
};

export default AuthLayout;
