"use client";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import {
  Flex,
  TextField,
  Button,
  Text,
  Heading,
  Card,
  Box,
  IconButton,
} from "@radix-ui/themes";
import {
  LockClosedIcon,
  PersonIcon,
  EyeOpenIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

import { registerSchema } from "../_lib/validations";
import Link from "next/link";
import { useRef, useState } from "react";
import ValidationCheckListTooltip from "@/components/tooltips/ValidationCheckListTooltip/ValidationCheckListTooltip";
import { useOutsideElement } from "@/hooks/useOutsideAlerter";
import AuthTextField from "../_components/AuthTextField/AuthTextField";
import { passwordValidationPlaceHolderItems } from "../_lib/config";
import { mapZodErrorsToValidationItems } from "@/components/tooltips/ValidationCheckListTooltip/validationCheckListTooltip.utils";
import { createUser } from "../_lib/actions";
import { useonTogglePasswordView } from "../_lib/hooks";
import classes from "./../layout.module.scss";

const RegisterPage = () => {
  const passwordInputRef = useRef<null | HTMLInputElement>(null);
  const [openPasswordValidationToolTip, setOpenPasswordValidationToolTip] =
    useState(false);
  useOutsideElement(passwordInputRef.current, () => {
    setOpenPasswordValidationToolTip(false);
  });
  const [lastResult, action] = useFormState(createUser, undefined);
  const { onTogglePasswordView, inputPasswordType } = useonTogglePasswordView({
    password: "password",
    confirmPassword: "password",
  });
  const [form, fields] = useForm({
    defaultValue: {},
    lastResult,
    onValidate: ({ formData }) => {
      const result = parseWithZod(formData, { schema: registerSchema });
      return result;
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const { firstName, lastName, email, password, confirmPassword } = fields;

  return (
    <Box
      width="100%"
      maxWidth="500px"
    >
      <form action={action} {...getFormProps(form)} noValidate>
        <Card className={classes.AuthLayout__Card} size="4">
          <Flex direction="column" gap="5" p="4">
            <Heading align="center" size="7" mb="2">
              Приятно познакомиться
            </Heading>
            <Flex direction="column" gap="2">
              {/* First Name */}
              <AuthTextField
                {...getInputProps(firstName, { type: "text" })}
                key={firstName.key}
                placeholder="Имя"
                size="3"
                defaultValue={firstName.initialValue}
                className={classes.AuthLayout__TextFieldRoot}
                dataIsValid={firstName.valid}
                errors={firstName.errors}
              >
                <PersonIcon height="16" width="16" />
              </AuthTextField>

              {/* Last Name */}

              <AuthTextField
                {...getInputProps(fields.lastName, { type: "text" })}
                key={lastName.key}
                placeholder="фамилия"
                size="3"
                defaultValue={fields.lastName.initialValue}
                className={classes.AuthLayout__TextFieldRoot}
                dataIsValid={lastName.valid}
                errors={lastName.errors}
              >
                <PersonIcon height="16" width="16" />
              </AuthTextField>

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

              <ValidationCheckListTooltip
                title="пароль должен содержать:"
                placeHolderItems={passwordValidationPlaceHolderItems}
                itemsAfterValidation={mapZodErrorsToValidationItems(
                  password.errors
                )}
                isValid={password.valid}
                isDirty={password.dirty}
                open={openPasswordValidationToolTip}
              >
                <TextField.Root
                  {...getInputProps(password, {
                    type: inputPasswordType.password,
                  })}
                  ref={passwordInputRef}
                  size="3"
                  key={password.key}
                  placeholder="пароль"
                  defaultValue={password.initialValue}
                  onClick={() => {
                    setOpenPasswordValidationToolTip(true);
                  }}
                >
                  <TextField.Slot>
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
                  </TextField.Slot>
                </TextField.Root>
              </ValidationCheckListTooltip>

              {/* confirmPassword Password */}

              <AuthTextField
                {...getInputProps(confirmPassword, {
                  type: inputPasswordType.confirmPassword,
                })}
                key={confirmPassword.key}
                placeholder="Повторите пароль"
                size="3"
                defaultValue={confirmPassword.initialValue}
                className={classes.AuthLayout__TextFieldRoot}
                dataIsValid={confirmPassword.valid}
                errors={confirmPassword.errors}
              >
                <>
                  <LockClosedIcon height="16" width="16" />
                  <IconButton
                    type="button"
                    onClick={onTogglePasswordView(confirmPassword.name)}
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
                  Уже есть аккаунт?
                  <Text ml="10px" color="blue">
                    <Link href="/auth/login">Войти</Link>
                  </Text>
                </Text>
              </Flex>

              <Button type="submit" size="3" mt="2">
                Зарегистрироваться
              </Button>
            </Flex>
          </Flex>
        </Card>
      </form>
    </Box>
  );
};

export default RegisterPage;
