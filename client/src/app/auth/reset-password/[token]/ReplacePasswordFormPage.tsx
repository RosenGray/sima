"use client";
import { useEffect, useRef, useState } from "react";
import { useOutsideElement } from "@/hooks/useOutsideAlerter";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import {
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import Form from "@/components/formManager/Form/Form";
import ValidationCheckListTooltip from "@/components/tooltips/ValidationCheckListTooltip/ValidationCheckListTooltip";
import { EyeOpenIcon, LockClosedIcon } from "@radix-ui/react-icons";
import AuthTextField from "../../_components/AuthTextField/AuthTextField";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import classes from "../../layout.module.scss";
import { passwordValidationPlaceHolderItems } from "../../_lib/config";
import { mapZodErrorsToValidationItems } from "@/components/tooltips/ValidationCheckListTooltip/validationCheckListTooltip.utils";
import {
  resetPasswordConfirmActionWrapper,
  setCookieAction,
} from "../../_lib/actions";
import { useonTogglePasswordView } from "../../_lib/hooks";
import { parseWithZod } from "@conform-to/zod";
import { resetPasswordConfirmSchema } from "../../_lib/validations";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { ServerErrorType } from "@sima-board/common";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { useFormState } from "react-dom";
const ReplacePasswordFormPage = ({ token: _token }: { token: string }) => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const passwordInputRef = useRef<null | HTMLInputElement>(null);
  const [openPasswordValidationToolTip, setOpenPasswordValidationToolTip] =
    useState(false);
  useOutsideElement(passwordInputRef.current, () => {
    setOpenPasswordValidationToolTip(false);
  });
  const [formState, formAction] = useFormState(
    resetPasswordConfirmActionWrapper,
    {
      isErrorFromTheServer: false,
    }
  );

  const { onTogglePasswordView, inputPasswordType } = useonTogglePasswordView({
    password: "password",
    confirmPassword: "password",
  });
  const [form, fields] = useForm({
    defaultValue: {
      token: _token,
    },
    lastResult: formState,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: resetPasswordConfirmSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });
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

  const { password, confirmPassword, token } = fields;

  return (
    <Box width="100%" maxWidth="500px">
      <Form action={formAction} {...getFormProps(form)} noValidate>
        {({ pending }) => (
          <Card className={classes.AuthLayout__Card} size="4">
            <Flex direction="column" gap="5" p="4">
              <Heading align="center" size="7" mb="2">
                Новый пароль
              </Heading>
              <Flex direction="column" gap="2">
                {/* Token */}

                <input
                  {...getInputProps(token, {
                    type: "hidden",
                  })}
                  key={token.key}
                  defaultValue={token.initialValue}
                  disabled={pending || loading}
                />

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
          formState?.errorType === ServerErrorType.TooManyRequests
            ? "Слишком много попыток сброса пароля. Пожалуйста, попробуйте снова через час."
            : undefined
        }
      />
    </Box>
  );
};

export default ReplacePasswordFormPage;
