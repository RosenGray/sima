"use client";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {
  EnvelopeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { Card, Box, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { LoginSchema } from "@/lib/auth/types/auth.scema";
import { loginUser } from "@/lib/auth/actions";
import Form from "@/components/Form/Form";
import { FormCard } from "./LoginForm.styles";
import AuthTextField from "@/components/Form/AuthTextField/AuthTextField";
import { useOnTogglePasswordView } from "@/lib/auth/hooks/useOnTogglePasswordView";
import { SubmitButton } from "@/components/Form/SubmitButton/SubmitButton";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";

const LoginForm = () => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [formState, formAction] = useActionState(loginUser, undefined);

  const { onTogglePasswordView, inputPasswordType } = useOnTogglePasswordView({
    password: "password",
  });
  const [form, fields] = useForm({
    defaultValue: {},
    lastResult: formState,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: LoginSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const handleModalClose = () => {
    setErrorModalOpen(false);
  };

  useEffect(() => {
    if (form.errors) {
      setErrorModalOpen(true);
    }
  }, [form.errors]);

  const { email, password } = fields;

  return (
    <Box width="100%" maxWidth="550px">
      <Form action={formAction} {...getFormProps(form)} noValidate>
        {({ pending }) => (
          <FormCard size="4">
            <Flex direction="column" gap="5" p="4">
              <Heading align="center" size="7" mb="2">
                Мы рады вас видеть
              </Heading>
              <Flex direction="column" gap="3">
                {/* Email */}
                <AuthTextField
                  {...getInputProps(fields.email, { type: "email" })}
                  _key={email.key}
                  placeholder="@ Адрес электронной почты"
                  size="3"
                  defaultValue={fields.email.initialValue}
                  dataIsValid={email.valid}
                  errors={email.errors}
                  disabled={pending}
                >
                  <EnvelopeClosedIcon height="16" width="16" />
                </AuthTextField>
                {/* Password */}
                <AuthTextField
                  {...getInputProps(password, {
                    type: inputPasswordType.password,
                  })}
                  _key={password.key}
                  placeholder="Пароль"
                  size="3"
                  defaultValue={password.initialValue}
                  dataIsValid={password.valid}
                  errors={password.errors}
                  disabled={pending}
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
                    <Text weight="bold" ml="5px" color="yellow">
                      <Link
                        href="/auth/register"
                        className={pending ? "disabled-link" : ""}
                      >
                        Зарегистрироваться
                      </Link>
                    </Text>
                  </Text>
                </Flex>
                <SubmitButton pending={pending} />
                <Text weight="bold" mt="3" color="yellow">
                  <Link
                    className={pending ? "disabled-link" : ""}
                    href="/auth/reset-password"
                  >
                    Забыли пароль?
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </FormCard>
        )}
      </Form>
      <ErrorModal
        open={errorModalOpen}
        onOpenChange={handleModalClose}
        errorMessage={form.errors}
      />
    </Box>
  );
};

export default LoginForm;
