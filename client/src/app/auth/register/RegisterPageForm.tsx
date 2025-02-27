"use client";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import {
  Flex,
  TextField,
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
import { useEffect, useRef, useState } from "react";
import ValidationCheckListTooltip from "@/components/tooltips/ValidationCheckListTooltip/ValidationCheckListTooltip";
import { useOutsideElement } from "@/hooks/useOutsideAlerter";
import AuthTextField from "../_components/AuthTextField/AuthTextField";
import { passwordValidationPlaceHolderItems } from "../_lib/config";
import { mapZodErrorsToValidationItems } from "@/components/tooltips/ValidationCheckListTooltip/validationCheckListTooltip.utils";
import { registerActionWrapper, setCookieAction } from "../_lib/actions";
import { useonTogglePasswordView } from "../_lib/hooks";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { ServerErrorType } from "@sima-board/common";
import Form from "@/components/formManager/Form/Form";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import classes from "./../layout.module.scss";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";

const RegisterPageForm = () => {
  const { setUser } = useAuth();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef<null | HTMLInputElement>(null);
  const [openPasswordValidationToolTip, setOpenPasswordValidationToolTip] =
    useState(false);
  useOutsideElement(passwordInputRef.current, () => {
    setOpenPasswordValidationToolTip(false);
  });
  const [formState, formAction] = useFormState(registerActionWrapper, {
    isErrorFromTheServer: false,
  });

  const { onTogglePasswordView, inputPasswordType } = useonTogglePasswordView({
    password: "password",
    confirmPassword: "password",
  });
  const [form, fields] = useForm({
    defaultValue: {},
    lastResult: formState,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: registerSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const { firstName, lastName, email, password, confirmPassword } = fields;


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
    <Box width="100%" maxWidth="500px">
      <Form action={formAction} {...getFormProps(form)} noValidate>
        {({ pending }) => (
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
                  disabled={pending || loading}
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
                  disabled={pending || loading}
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
                  disabled={pending || loading}
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
                  <Box>
                    <Text
                      htmlFor={password.id}
                      as="label"
                      size="2"
                      weight="medium"
                    >
                      пароль
                    </Text>
                    <TextField.Root
                      {...getInputProps(password, {
                        type: inputPasswordType.password,
                      })}
                      ref={passwordInputRef}
                      size="3"
                      mt="10px"
                      key={password.key}
                      placeholder="пароль"
                      defaultValue={password.initialValue}
                      disabled={pending || loading}
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
                  </Box>
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
                  disabled={pending || loading}
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
                <SubmitButton pending={pending || loading} />
              </Flex>
            </Flex>
          </Card>
        )}
      </Form>

      <ErrorModal
        open={errorModalOpen}
        onOpenChange={handleModalClose}
        errorMessage={
          formState?.errorType === ServerErrorType.AuthUserAlreadyExists
            ? "Электронная почта уже используется"
            : undefined
        }
      />
    </Box>
  );
};

export default RegisterPageForm;

