"use client";

import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Flex, Text, Heading, Card, Box } from "@radix-ui/themes";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import classes from "./../layout.module.scss";
import Link from "next/link";
import { resetPasswordSchema } from "../_lib/validations";
import { resetPasswordActionWrapper } from "../_lib/actions";
import AuthTextField from "../_components/AuthTextField/AuthTextField";
import Form from "@/components/formManager/Form/Form";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import { useFormState } from "react-dom";

const ResetPasswordForm = () => {
  const [formState, formAction] = useFormState(resetPasswordActionWrapper, {
    isErrorFromTheServer: false,
    isSuccess: false,
  });

  const [form, fields] = useForm({
    defaultValue: {},
    lastResult: formState,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: resetPasswordSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const { email } = fields;

  const renderSuccessMessageOrForm = () => {
    if (formState?.isSuccess) {
      return (
        <Card className={classes.AuthLayout__Card} size="5">
          <Flex direction="column" gap="5" p="4">
            <Heading align="center" size="7" mb="2">
              Проверьте вашу почту
            </Heading>
            <Text align="center" size="4" color="gray">
              Если аккаунт с таким адресом электронной почты существует, вы
              получите инструкции по сбросу пароля.
            </Text>
          </Flex>
        </Card>
      );
    }
    return (
      <Form action={formAction} {...getFormProps(form)} noValidate>
        {({ pending }) => (
          <Card className={classes.AuthLayout__Card} size="5">
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
                  className={classes.AuthLayout__TextFieldRoot}
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
          </Card>
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
