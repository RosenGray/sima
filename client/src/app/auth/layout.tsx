import { FC, ReactNode } from "react";
import { Container, Flex } from "@radix-ui/themes";
import classes from "./layout.module.scss";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Container px="10px"  className={classes.AuthLayout}>
      <Flex className={classes.AuthLayout__Flex} justify="center" align="center">
        {children}
      </Flex>
    </Container>
  );
};

export default AuthLayout;
