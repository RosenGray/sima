"use client";
import { FC, useEffect, useState } from "react";
import SelectSingle from "@/components/Form/SelectSingle/SelectSingle";
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  ProfessionalServiceSchema,
} from "@/lib/professionals/professional-service/types/professional-service.scema";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import { useActionState } from "react";
import { usePublishAd } from "../../_providers/PublishAdProvider";
import {
  mapServiceCategoriesToSelectOptions,
  mapServiceSubCategoriesToSelectOptions,
} from "@/lib/professionals/utils/professionals.utils";
import {
  getCitiesToSelectOptions,
  mapAreasToSelectOptions,
} from "@/lib/cities";
import TextAreaField from "@/components/Form/TextAreaField/TextAreaField";
import Form from "@/components/Form/Form";
import DropFilesInput from "@/components/Form/DropFilesInput/DropFilesInput";
import ImagesPreviewer from "@/components/ImagesPreviewer/ImagesPreviewer";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import BasicFormField from "@/components/Form/BasicFormField/BasicFormField";
import PhoneFormField from "@/components/Form/PhoneFormField/PhoneFormField";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import Checkbox from "@/components/Form/Checkbox/Checkbox";
import { publishProfessionalServiceAd } from "@/lib/professionals/professional-service/actions/publishProfessionalServiceAd";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";

const areasOptions = mapAreasToSelectOptions();

const ProfessionalServicePublishForm: FC = () => {
  const { user } = useAuth();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const { mappedCategories } = usePublishAd();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formState, formAction] = useActionState(
    publishProfessionalServiceAd,
    undefined
  );
  const [form, fields] = useForm({
    defaultValue: {
      images: [],
      email: user?.email,
      district: Districts.Center,
    },
    lastResult: formState,
    onValidate: ({ formData }) => {
      // Create a new FormData with accumulated files
      const updatedFormData = new FormData();

      // Copy all existing form data
      for (const [key, value] of formData.entries()) {
        if (key !== "images") {
          updatedFormData.append(key, value);
        }
      }

      // Add all accumulated files (this includes files from the current drop)
      selectedFiles.forEach((file) => {
        updatedFormData.append("images", file);
      });

      // Also add any files from the current formData (for the first drop)
      const currentImages = formData.getAll("images");
      currentImages.forEach((file) => {
        if (
          file instanceof File &&
          !selectedFiles.some((f) => f.name === file.name)
        ) {
          updatedFormData.append("images", file);
        }
      });

      return parseWithZod(updatedFormData, {
        schema: ProfessionalServiceSchema,
      });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });
  console.log("formState", formState);
  console.log("form", form.errors);

  const handleModalClose = () => {
    
    setErrorModalOpen(false);
  };



  const {
    category,
    subCategory,
    district,
    city,
    description,
    email,
    phoneNumber,
    areaCode,
    acceptTerms,
    images,
  } = fields;
  const categoriesOptions =
    mapServiceCategoriesToSelectOptions(mappedCategories);
  const subCategoryOptions = mapServiceSubCategoriesToSelectOptions(
    mappedCategories,
    category.value
  );
  const citiesOptions = getCitiesToSelectOptions(district.value as Districts);
  useEffect(() => {
    console.log(1)
    if (formState) {
      setErrorModalOpen(true);
    }
  }, [formState]);

  console.log('errorModalOpen',errorModalOpen)

  return (
    <>
      <Form action={formAction} {...getFormProps(form)}>
        {({ pending }) => (
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

              {/* area */}
              <SelectSingle
                label="Выберите район"
                field={district}
                placeholder="Выберите район"
                options={areasOptions}
                defaultValue={areasOptions[0]}
                errors={district.errors}
                isDisabled={pending}
              />
              {/* city */}

              <SelectSingle
                label="Выберите город"
                field={city}
                placeholder="Выберите город"
                defaultValue={citiesOptions[0]}
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
              disabled={false}
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
                  isLoading={pending || isRevalidating}
                /> */}
            </Flex>
          </Box>
        )}
      </Form>
      <ErrorModal open={errorModalOpen} onOpenChange={handleModalClose} />
    </>
  );
};

export default ProfessionalServicePublishForm;
