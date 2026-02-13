"use client";

import { useForm, getFormProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { useActionState, useEffect, useState } from "react";
import { ContactUsSchema } from "@/lib/service/contact-us/types/contactUs.schema";
import { submitContactUs } from "@/lib/service/contact-us/actions/submitContactUs";
import BasicFormField from "@/components/Form/BasicFormField/BasicFormField";
import TextAreaField from "@/components/Form/TextAreaField/TextAreaField";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { FormCard } from "@/components/Form/FormCard/FormCard.styles";
import Loader from "@/components/Loader/Loader";
import {
  ContactUsFormContainer,
  ContactUsFormOverlay,
} from "./ContactUsForm.styles";

const ContactUsForm = () => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [formState, formAction, isPending] = useActionState(
    submitContactUs,
    undefined
  );

  const [form, fields] = useForm({
    defaultValue: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    lastResult: formState,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: ContactUsSchema });
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

  const { name, email, subject, message } = fields;

  return (
    <ContactUsFormContainer>
      <form action={formAction} {...getFormProps(form)} noValidate>
        <FormCard size="4">
          <Flex
            direction="column"
            gap={{ initial: "4", sm: "5" }}
            p={{ initial: "3", sm: "4" }}
          >
            <Heading align="center" size="7" mb="2">
              Свяжитесь с нами
            </Heading>
            <Text align="center" size="3" color="gray" mb="2">
              Оставьте сообщение, и мы свяжемся с вами в ближайшее время
            </Text>
            <Flex direction="column" gap="3">
              <BasicFormField
                type="text"
                field={name}
                label="Имя"
                placeholder="Ваше имя"
                size="3"
                defaultValue={name.initialValue}
                dataIsValid={name.valid}
                errors={name.errors}
                isMandatory
                disabled={isPending}
              />
              <BasicFormField
                type="email"
                field={email}
                label="Email"
                placeholder="example@email.com"
                size="3"
                defaultValue={email.initialValue}
                dataIsValid={email.valid}
                errors={email.errors}
                isMandatory
                disabled={isPending}
              />
              <BasicFormField
                type="text"
                field={subject}
                label="Тема"
                placeholder="Тема сообщения (необязательно)"
                size="3"
                defaultValue={subject.initialValue}
                dataIsValid={subject.valid}
                errors={subject.errors}
                disabled={isPending}
              />
              <TextAreaField
                field={message}
                label="Сообщение"
                placeholder="Ваше сообщение..."
                size="3"
                dataIsValid={message.valid}
                errors={message.errors}
                isMandatory
                disabled={isPending}
              />
              <SubmitButton
                pending={isPending}
                text="Отправить"
                disabled={isPending}
              />
            </Flex>
          </Flex>
        </FormCard>
      </form>

      {isPending && (
        <ContactUsFormOverlay>
          <Loader size="large" />
        </ContactUsFormOverlay>
      )}

      <ErrorModal
        open={errorModalOpen}
        onOpenChange={handleModalClose}
        errorMessage={form.errors}
      />
    </ContactUsFormContainer>
  );
};

export default ContactUsForm;
