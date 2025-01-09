"use client";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import {
  Flex,

  Button,
  Text,
  Heading,
  Card,
  Box,
  IconButton,
} from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,

} from "@radix-ui/react-icons";
import classes from "./../layout.module.scss";
import Link from "next/link";
import { loginSchema } from "../_lib/validations";
import { createUser } from "../_lib/actions";
import AuthTextField from "../_components/AuthTextField/AuthTextField";
import { useonTogglePasswordView } from "../_lib/hooks";

const LoginPage = () => {
  const [lastResult, action] = useFormState(createUser, undefined);

  const { onTogglePasswordView, inputPasswordType } = useonTogglePasswordView({
    password: "password",
  });

  const [form, fields] = useForm({
    defaultValue: {},
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const { email, password } = fields;

  return (
    <Box
      className={classes.AuthLayout__FormContaier}
      width="100%"
      maxWidth="550px"
    >
      <form action={action} {...getFormProps(form)} noValidate>
        <Card size="4">
          <Flex direction="column" gap="5" p="4">
            <Heading align="center" size="7" mb="2">
              Мы рады вас видеть
            </Heading>
            <Flex direction="column" gap="2">
              {/* Email */}

              <AuthTextField
                {...getInputProps(fields.email, { type: "email" })}
                key={email.key}
                placeholder="@ Адрес электронной почты"
                size="3"
                defaultValue={fields.email.initialValue}
                className={classes.AuthLayout__TextFieldRoot}
                dataIsValid={email.valid}
                errors={email.errors}
              >
                <EnvelopeClosedIcon height="16" width="16" />
              </AuthTextField>

              {/* Password */}
              <AuthTextField
                {...getInputProps(password, {
                  type: inputPasswordType.password,
                })}
                key={password.key}
                placeholder="Повторите пароль"
                size="3"
                defaultValue={password.initialValue}
                className={classes.AuthLayout__TextFieldRoot}
                dataIsValid={password.valid}
                errors={password.errors}
              >
                <>
                  <LockClosedIcon height="16" width="16" />
                  <IconButton
                    type="button"
                    onClick={onTogglePasswordView(password.name)}
                    size="3"
                    variant="ghost"
                    color="yellow"
                  >
                    <EyeOpenIcon height="16" width="16" />
                  </IconButton>
                </>
              </AuthTextField>

              <Flex justify="between" align="center" mt="1">
                <Text size="4" color="gray">
                  вы еще не зарегистрированы?
                  <Text ml="10px" color="blue">
                    <Link href="/auth/register">Зарегистрироваться</Link>
                  </Text>
                </Text>
              </Flex>

              <Button type="submit" size="3" mt="2">
                Войти
              </Button>
            </Flex>
          </Flex>
        </Card>
      </form>
    </Box>
  );
};

export default LoginPage;
