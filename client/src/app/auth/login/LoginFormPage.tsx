"use client";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { Flex, Text, Heading, Card, Box, IconButton } from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { loginSchema } from "../_lib/validations";
import { loginActionWrapper, setCookieAction } from "../_lib/actions";
import AuthTextField from "../_components/AuthTextField/AuthTextField";
import { useonTogglePasswordView } from "../_lib/hooks";
import Form from "@/components/Form/Form";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { useEffect, useState } from "react";
import { ServerErrorType } from "@sima-board/common";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import classes from "./../layout.module.scss";

const LoginFormPage = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [formState, formAction] = useFormState(loginActionWrapper, {
    isErrorFromTheServer: false,
    isSuccess: false,
  });
  const { onTogglePasswordView, inputPasswordType } = useonTogglePasswordView({
    password: "password",
  });
  const [form, fields] = useForm({
    defaultValue: {},
    lastResult: formState,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });
  console.log("isLoading", loading);
  const { email, password } = fields;

  const handleModalClose = () => {
    setErrorModalOpen(false);
    const formData = new FormData();
    formData.append("_action", "reset_server_error");
    formAction(formData);
  };

  useEffect(() => {
    if (formState?.isErrorFromTheServer) {
      setErrorModalOpen(true);
    }
    if (formState?.isSuccess) {
      console.log(11111);
      setLoading(true);
      const data = formState.data;
      if (data && data.cookieData) {
        const { cookieData, user } = data;
        setUser(user);
        setCookieAction(cookieData);
      }
    }
  }, [formState?.isErrorFromTheServer, formState?.isSuccess, formState?.data]);

  return (
    <Box width="100%" maxWidth="550px">
      <Form action={formAction} {...getFormProps(form)} noValidate>
        {({ pending }) => (
          <Card className={classes.AuthLayout__Card} size="4">
            <Flex direction="column" gap="5" p="4">
              <Heading align="center" size="7" mb="2">
                Мы рады вас видеть
              </Heading>
              <Flex direction="column" gap="3">
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
                  disabled={pending || loading}
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
                  disabled={pending || loading}
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
                    <Text weight="bold" ml="10px" color="yellow">
                      <Link href="/auth/register">Зарегистрироваться</Link>
                    </Text>
                  </Text>
                </Flex>
                <SubmitButton pending={pending || loading} />
                <Text weight="bold" mt="3" color="yellow">
                  <Link href="/auth/reset-password">Забыли пароль?</Link>
                </Text>
              </Flex>
            </Flex>
          </Card>
        )}
      </Form>
      <ErrorModal
        open={errorModalOpen}
        onOpenChange={handleModalClose}
        errorMessage={
          formState?.errorType === ServerErrorType.AuthWrongPasswordOrEmail
            ? "Неверный логин или пароль"
            : undefined
        }
      />
    </Box>
  );
};

export default LoginFormPage;
