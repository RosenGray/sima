"use client";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
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
import { useActionState, useEffect, useRef, useState } from "react";
import { registerUser } from "@/lib/auth/actions/register";
import { useOnTogglePasswordView } from "@/lib/auth/hooks/useOnTogglePasswordView";
import { RegisterSchema } from "@/lib/auth/types/auth.scema";
import Form from "@/components/Form/Form";
import AuthTextField from "@/components/Form/AuthTextField/AuthTextField";
import Link from "next/link";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { useOutsideElement } from "@/lib/auth/hooks/useOutsideElement";
import ValidationCheckListTooltip from "@/components/tooltips/ValidationCheckListTooltip/ValidationCheckListTooltip";
import { mapZodErrorsToValidationItems, passwordValidationPlaceHolderItems } from "@/components/tooltips/ValidationCheckListTooltip/validationCheckListTooltip.utils";

const RegisterPageForm = () => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const passwordInputRef = useRef<null | HTMLInputElement>(null);
  const [openPasswordValidationToolTip, setOpenPasswordValidationToolTip] =
    useState(false);
  useOutsideElement(passwordInputRef.current, () => {
    setOpenPasswordValidationToolTip(false);
  });
  const [formState, formAction] = useActionState(registerUser, undefined);
  const { onTogglePasswordView, inputPasswordType } = useOnTogglePasswordView({
    password: "password",
    confirmPassword: "password",
  });
  const [form, fields] = useForm({
    defaultValue: {},
    lastResult: formState,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: RegisterSchema });
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
    if (form.errors) {
      setErrorModalOpen(true);
    }
  }, [form.errors]);
  return (
    <Box width="100%" maxWidth="500px">
      <Form action={formAction} {...getFormProps(form)} noValidate>
        {({ pending }) => (
          <Card  size="4">
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
                  dataIsValid={firstName.valid}
                  errors={firstName.errors}
                  disabled={pending}
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
                  dataIsValid={lastName.valid}
                  errors={lastName.errors}
                  disabled={pending}
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
                  dataIsValid={email.valid}
                  errors={email.errors}
                  disabled={pending}
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
                      disabled={pending}
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
                  dataIsValid={confirmPassword.valid}
                  errors={confirmPassword.errors}
                  disabled={pending}
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
                <SubmitButton pending={pending} />
              </Flex>
            </Flex>
          </Card>
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

export default RegisterPageForm;

