"use client";
import { Heading, Box, Flex, Grid, Button } from "@radix-ui/themes";
import {
  getCitiesToSelectOptions,
  mapAreasToSelectOptions,
} from "@/utils/cities";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceCategoriesMapping } from "../../_lib/actions";
import Form from "@/components/formManager/Form/Form";
import {
  mapServiceCategoriesToSelectOptions,
  mapServiceSubCategoriesToSelectOptions,
} from "../../_lib/utils";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { getFormProps, useForm } from "@conform-to/react";
import {
  professionalsMutateActionWrapper,
  revalidateProfessionals,
} from "../../_lib/serverActions";
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  ProfessionalSchema,
} from "../../_lib/validations/professionalMutationSchema";
import SelectSingle from "@/components/formManager/SelectSingle/SelectSingle";
import TextAreaField from "@/components/formManager/TextAreaField/TextAreaField";
import DropFilesInput from "@/components/formManager/DropFilesInput/DropFilesInput";
import SkeletonLoader from "@/components/SkeletonLoader/SkeletonLoader";
import ImagesPreviewer from "@/components/ImagesPreviewer/ImagesPreviewer";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import BasicFormField from "@/components/formManager/BasicFormField/BasicFormField";
import PhoneFormField from "@/components/formManager/PhoneFormField/PhoneFormField";
import ReCAPTCHA from "@/components/GoogleReCAPTCHA/GoogleReCAPTCHA";
import { useEffect, useState } from "react";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import Checkbox from "@/components/formManager/Checkbox/Checkbox";
import { Districts } from "@/types/cities";
import { useRouter } from "next/navigation";
import classes from "./ProfessionalsPublishForm.module.scss";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { ProfessionalGET } from "../../_lib/types";
import Link from "next/link";

const areasOptions = mapAreasToSelectOptions();

export const ProfessionalsPublishForm = () => {
  const { user } = useAuth();
  console.log(user);
  const router = useRouter();
  const [formState, formAction] = useFormState(
    professionalsMutateActionWrapper,
    {
      isErrorFromTheServer: false,
      isSuccess: false,
    }
  );
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [form, fields] = useForm({
    defaultValue: {
      images: [],
      district: Districts.Center,
    },
    lastResult: formState,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: ProfessionalSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["serviceCategoriesMapping"],
    queryFn: () => getServiceCategoriesMapping(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (formState.isSuccess && formState.data) {
      const prof = formState.data.professional;
      queryClient.setQueryData(
        ["getProfessionals"],
        (draft: ProfessionalGET[]) => {
          return [...draft, prof];
        }
      );
      revalidateProfessionals();
      router.push("/professionals/all");
    }
  }, [formState.isSuccess]);

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
  }, [formState?.isErrorFromTheServer]);

  const {
    category,
    subCategory,
    district,
    city,
    description,
    images,
    email,
    phoneNumber,
    areaCode,
    acceptTerms,
  } = fields;

  const renderForm = () => {
    if (isLoading) return <SkeletonLoader />;

    if (!data) {
      throw new Error("Not implemented");
    }
    const citiesOptions = getCitiesToSelectOptions(
      (district.value as Districts) ?? Districts.Center
    );
    const categoriesOptions = mapServiceCategoriesToSelectOptions(data);
    const subCategoryOptions = mapServiceSubCategoriesToSelectOptions(
      data,
      category.value
    );
    return (
      <>
        <Form action={formAction} {...getFormProps(form)}>
          {({ pending }) => {
            return (
              <Box>
                <Grid columns="2" gap="4" mb="4">
                  {/* category */}
                  <SelectSingle
                    label="Выберите доску"
                    field={category}
                    placeholder="Выберите доску"
                    options={categoriesOptions}
                    defaultValue={categoriesOptions[0]}
                    errors={category.errors}
                    isDisabled={pending}
                  />

                  {/* subCategory */}

                  <SelectSingle
                    label="Выберите подкатегорию"
                    field={subCategory}
                    placeholder="Выберите подкатегорию"
                    options={subCategoryOptions}
                    defaultValue={subCategoryOptions[0]}
                    errors={subCategory.errors}
                    isDisabled={pending}
                  />

                  {/* Area */}

                  <SelectSingle
                    label="Выберите район"
                    field={district}
                    placeholder="Выберите район"
                    options={areasOptions}
                    errors={district.errors}
                    isDisabled={pending}
                  />
                  {/* city */}

                  <SelectSingle
                    label="Выберите город"
                    field={city}
                    placeholder="Выберите город"
                    options={citiesOptions}
                    errors={city.errors}
                    isDisabled={pending}
                  />
                </Grid>
                {/* description */}
                <TextAreaField
                  field={description}
                  label="Текст объявления:"
                  placeholder="Текст объявления:"
                  size="3"
                  defaultValue={description.initialValue}
                  className={classes.AuthLayout__TextFieldRoot}
                  dataIsValid={description.valid}
                  errors={description.errors}
                  rows={5}
                  mb="5px"
                  disabled={pending}
                />

                <DropFilesInput
                  accept={{
                    "image/png": [],
                    "image/jpeg": [],
                    "image/jpg": [],
                    "image/webp": [],
                  }}
                  maxSize={MAX_FILE_SIZE}
                  maxFiles={MAX_FILES}
                  field={images}
                  errors={images.errors}
                  onFilesDrop={setSelectedFiles}
                  files={selectedFiles}
                  disabled={pending}
                />
                {selectedFiles.length > 0 && (
                  <Box mt="4" mb="4">
                    <ImagesPreviewer
                      images={selectedFiles}
                      setImages={setSelectedFiles}
                      maxImages={MAX_FILES}
                    />
                  </Box>
                )}

                {/* Contact Information */}
                <Box mt="4">
                  <Heading as="h3" size="4" mb="2">
                    Контактная информация
                  </Heading>
                  <Grid columns="2" gap="4">
                    <BasicFormField
                      type="email"
                      field={email}
                      label="Email"
                      anotherLabel="*виден только администрации сайта и не отображается публично"
                      placeholder="@ Адрес электронной почты"
                      size="3"
                      defaultValue={fields.email.initialValue}
                      dataIsValid={email.valid}
                      errors={email.errors}
                      disabled={pending}
                    >
                      <EnvelopeClosedIcon height="16" width="16" />
                    </BasicFormField>
                    <PhoneFormField
                      areaCodeField={areaCode}
                      label="Телефон"
                      field={phoneNumber}
                      errors={phoneNumber.errors}
                      size="3"
                      disabled={pending}
                    />
                  </Grid>
                </Box>
                {/* Personal Page Link */}

                <BasicFormField
                      type="text"
                      field={email}
                      label="Email"
                      anotherLabel="*виден только администрации сайта и не отображается публично"
                      placeholder="@ Адрес электронной почты"
                      size="3"
                      defaultValue={fields.email.initialValue}
                      dataIsValid={email.valid}
                      errors={email.errors}
                      disabled
                    >
                      <EnvelopeClosedIcon height="16" width="16" />
                    </BasicFormField>

                <Box mt="4">
                  <Heading as="h3" size="4" mb="2">
                    Твоя Личная страница
                  </Heading>
                  {/* <p>{user?.hasPrivateProfessionalPage ? "Да" : "Нет"}</p> */}
                  <Link
                    target="_blank"
                    href={`/professionals/personal/${user!.firstName.toLowerCase()}-${user!.lastName.toLowerCase()}`}
                  >
                    <Button
                      type="button"
                      style={{ cursor: "pointer" }}
                      variant="outline"
                      size="3"
                    >
                      {`${process.env.NEXT_PUBLIC_CLIENT_URL}/professionals/personal/${user!.firstName.toLowerCase()}-${user!.lastName.toLowerCase()}`}
                    </Button>
                  </Link>
                </Box>

                <Flex                 
                  mt="4"
                  direction="column"
                  gap="3"
                  justify="center"
                  align="center"
                >
                  <Checkbox
                    field={acceptTerms}
                    label="Я согласен с условиями"
                    errors={acceptTerms.errors}
                    disabled={pending}
                  />
                  <SubmitButton pending={pending} text="Добавить объявление" />

                  {/* <ReCAPTCHA
                  submitButtonText="Добавить объявление"
                  isLoading={pending}
                /> */}
                </Flex>
              </Box>
            );
          }}
        </Form>
        <ErrorModal open={errorModalOpen} onOpenChange={handleModalClose} />
      </>
    );
  };

  return <>{renderForm()}</>;
};

export default ProfessionalsPublishForm;
