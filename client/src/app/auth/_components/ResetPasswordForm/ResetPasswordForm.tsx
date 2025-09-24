"use client";

import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import AuthTextField from "@/components/Form/AuthTextField/AuthTextField";
import Form from "@/components/Form/Form";
import { FormCard } from "@/components/Form/FormCard/FormCard.styles";
import { resetPassword } from "@/lib/auth/actions/reset-password";
import { ResetPasswordSchema } from "@/lib/auth/types/auth.scema";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { EnvelopeClosedIcon, HomeIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useActionState } from "react";

const ResetPasswordForm = () => {
  const [formState, formAction] = useActionState(resetPassword, undefined);

  const [form, fields] = useForm({
    defaultValue: {},
    lastResult: formState,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: ResetPasswordSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const { email } = fields;


  const renderSuccessMessageOrForm = () => {
    if (formState?.status === "success") {
      return (
        <FormCard
          style={{ display: "flex", flexDirection: "column", gap: "5" }}
          size="5"
        >
          <Flex direction="column" gap="5" p="4">
            <Heading align="center" size="7" mb="2">
              Проверьте вашу почту
            </Heading>
            <Text align="center" size="4" color="gray">
              Если аккаунт с таким адресом электронной почты существует, вы
              получите инструкции по сбросу пароля.
            </Text>
          </Flex>
          <Button asChild variant="surface">
            <Link href="/">
              <HomeIcon />
              <Text size="2">Вернуться домой</Text>
            </Link>
          </Button>
        </FormCard>
      );
    }
    return (
      <Form action={formAction} {...getFormProps(form)} noValidate>
        {({ pending }) => (
          <FormCard size="5">
            <Flex direction="column" gap="5" p="4">
              <Heading align="center" size="7" mb="2">
                Забыли пароль?
              </Heading>
              <Text align="center" size="4" color="gray">
                Мы отправим вам ссылку для восстановления пароля на ваш email
              </Text>
              <Flex direction="column" gap="2">
                {/* Email */}

                <AuthTextField
                  {...getInputProps(fields.email, { type: "email" })}
                  key={email.key}
                  placeholder="Email"
                  size="3"
                  defaultValue={fields.email.initialValue}
                  dataIsValid={email.valid}
                  errors={email.errors}
                  disabled={pending}
                >
                  <EnvelopeClosedIcon height="16" width="16" />
                </AuthTextField>

                <Flex justify="between" align="center" mt="1">
                  <Text size="4" color="gray">
                    вы еще не зарегистрированы?
                    <Text ml="10px" color="yellow">
                      <Link href="/auth/register">Зарегистрироваться</Link>
                    </Text>
                  </Text>
                </Flex>

                <SubmitButton pending={pending} text="Войти" />
              </Flex>
            </Flex>
          </FormCard>
        )}
      </Form>
    );
  };

  return (
    <Box width="100%" maxWidth="600px">
      {renderSuccessMessageOrForm()}
    </Box>
  );
};

export default ResetPasswordForm;
