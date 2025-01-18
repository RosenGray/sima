"use client";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { Flex, Button, Text, Heading, Card, Box } from "@radix-ui/themes";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import classes from "./../layout.module.scss";
import Link from "next/link";
import { resetPasswordSchema } from "../_lib/validations";
import { registerActionWrapper } from "../_lib/actions";
import AuthTextField from "../_components/AuthTextField/AuthTextField";

const LoginPage = () => {
  const [lastResult, action] = useFormState(registerActionWrapper, undefined);

  const [form, fields] = useForm({
    defaultValue: {},
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: resetPasswordSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const { email } = fields;

  return (
    <Box width="100%" maxWidth="600px">
      <form action={action} {...getFormProps(form)} noValidate>
        <Card className={classes.AuthLayout__Card} size="5">
          <Flex direction="column" gap="5" p="4">
            <Heading align="center" size="7" mb="2">
              Забыли пароль?
            </Heading>
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
