"use client";
import { FC, useEffect, useMemo, useState } from "react";
import SelectSingle from "@/components/Form/SelectSingle/SelectSingle";
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  createProfessionalServiceSchema,
  SerilizeProfessionalService,
} from "@/lib/professionals/professional-service/types/professional-service.scema";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Box, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import { useActionState } from "react";

import {
  mapServiceCategoriesToSelectOptions,
  mapServiceSubCategoriesToSelectOptions,
} from "@/lib/service-categories/utils/professionals.utils";
import {
  getCitiesToSelectOptions,
  mapAreasToSelectOptions,
} from "@/lib/cities";
import TextAreaField from "@/components/Form/TextAreaField/TextAreaField";
import DropFilesInput from "@/components/Form/DropFilesInput/DropFilesInput";
import ImagesPreviewer from "@/components/ImagesPreviewer/ImagesPreviewer";
import { EnvelopeClosedIcon, MobileIcon } from "@radix-ui/react-icons";
import BasicFormField from "@/components/Form/BasicFormField/BasicFormField";
import PhoneFormField from "@/components/Form/PhoneFormField/PhoneFormField";
import Checkbox from "@/components/Form/Checkbox/Checkbox";
import { publishProfessionalServiceAd } from "@/lib/professionals/professional-service/actions/publishProfessionalServiceAd";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import { ExistingImageItem } from "@/app/api/files/create/route";
import { FormMode } from "@/components/Form/types/form.types";
import { editProfessionalServiceAd } from "@/lib/professionals/professional-service/actions/editProfessionalServiceAd";
import Loader from "@/components/Loader";
import {
  DropzoneSurface,
  FormShell,
  HeroCard,
  SectionCard,
} from "./ProfessionalServicePublishForm.styles";
import { usePublishProfessionalServiceAd } from "../../_providers/PublishProfessionalServiceAdProvider";

const areasOptions = mapAreasToSelectOptions();

interface ProfessionalServicePublishFormProps {
  service?: SerilizeProfessionalService;
  formMode: FormMode;
}

const ProfessionalServicePublishForm: FC<
  ProfessionalServicePublishFormProps
> = ({ service, formMode }) => {
  const isCreateMode = formMode === FormMode.Create;
  const { user } = useAuth();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const { mappedCategories } = usePublishProfessionalServiceAd();
  const [formKey, setFormKey] = useState(0); // Key to force form re-render for reset
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImageItem[]>(
    () => {
      return (
        service?.images.map((image) => ({
          ...image,
          isExisting: true,
          toBeDeleted: false,
        })) || []
      );
    }
  );
  const imagesToDelete = useMemo(() => {
    return existingImages.filter((image) => image.toBeDeleted);
  }, [existingImages]);

  const allImagesShouldBeDeleted =
    imagesToDelete.length === existingImages.length;

  const updateUserWithImagesToDelete = editProfessionalServiceAd.bind(null, {
    servicePublicId: service?.publicId as string,
    imagesToDelete,
    allImagesShouldBeDeleted,
  });

  const [formState, formAction, isPending] = useActionState(
    isCreateMode ? publishProfessionalServiceAd : updateUserWithImagesToDelete,
    undefined
  );

  const [form, fields] = useForm({
    defaultValue: {
      category: service?.category?.id,
      subCategory: service?.subCategory?.id,
      district: service?.district || Districts.Center,
      city: service?.city,
      images: [],
      email: user?.email,
      phoneNumber: service?.phoneNumber,
      description: service?.description,
      acceptTerms: service?.acceptTerms ? "on" : null,
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
          file.size > 0 &&
          file.name !== "undefined" &&
          !selectedFiles.some((f) => f.name === file.name)
        ) {
          updatedFormData.append("images", file);
        }
      });

      return parseWithZod(updatedFormData, {
        schema: createProfessionalServiceSchema({
          minNumberOfImages: allImagesShouldBeDeleted ? 1 : 0,
        }),
      });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  // Function to reset form state
  const resetForm = () => {
    // Reset selected files
    setSelectedFiles([]);
    // Force form re-render by updating the key - this will reset the entire form
    setFormKey((prev) => prev + 1);
  };

  const handleModalClose = () => {
    resetForm();
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
    acceptTerms,
    images,
  } = fields;

 
  const categoriesOptions = useMemo(
    () => mapServiceCategoriesToSelectOptions(mappedCategories),
    [mappedCategories]
  );
  const subCategoryOptions = useMemo(
    () =>
      mapServiceSubCategoriesToSelectOptions(mappedCategories, category.value),
    [mappedCategories, category.value]
  );

  const citiesOptions = useMemo(
    () =>
      getCitiesToSelectOptions(
        (district.value as Districts) || Districts.Center
      ),
    [district.value]
  );
  useEffect(() => {
    if (formState) {
      setErrorModalOpen(true);
    }
  }, [formState]);

  if (isPending) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: "600px" }}>
        <Loader size="xlarge" />
      </Flex>
    );
  }

  return (
    <>
      <form
        key={formKey.toString()}
        action={formAction}
        {...getFormProps(form)}
      >
        <FormShell px={{ initial: "4", sm: "6", md: "8" }} py={{ initial: "5", md: "7" }}>
          <Flex
            direction="column"
            gap={{ initial: "5", md: "6" }}
            align={{ initial: "stretch", md: "center" }}
          >
            <HeroCard variant="surface" size="4">
              <Flex
                direction={{ initial: "column", md: "row" }}
                justify="between"
            align={{ initial: "start", md: "center" }}
                gap="4"
              >
                <Box>
                  <Heading as="h1" size={{ initial: "6", md: "7" }}>
                    Расскажите об услуге
                  </Heading>
                  <Text mt="2" size={{ initial: "3", md: "4" }} color="gray" highContrast>
                    Поделитесь ключевыми деталями, добавьте фотографии и оставьте
                    контакты — это займёт всего пару минут.
                  </Text>
                </Box>

              </Flex>
            </HeroCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Основные параметры
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Уточните категорию и область публикации, чтобы клиенты нашли
                    вас быстрее.
                  </Text>
                </Box>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <SelectSingle
                    label="Выберите доску"
                    field={category}
                    placeholder="Выберите доску"
                    options={categoriesOptions}
                    errors={category.errors}
                    isDisabled={isPending}
                    defaultValue={categoriesOptions[3]}
                  />

                  <SelectSingle
                    label="Выберите подкатегорию"
                    field={subCategory}
                    placeholder="Выберите подкатегорию"
                    options={subCategoryOptions}
                    errors={subCategory.errors}
                    isDisabled={isPending}
                    defaultValue={subCategoryOptions[0]}
                  />

                  <SelectSingle
                    label="Выберите район"
                    field={district}
                    placeholder="Выберите район"
                    options={areasOptions}
                    errors={district.errors}
                    isDisabled={isPending}
                  />

                  <SelectSingle
                    label="Выберите город"
                    field={city}
                    placeholder="Выберите город"
                    options={citiesOptions}
                    errors={city.errors}
                    isDisabled={isPending}
                    defaultValue={citiesOptions[0]}
                  />
                </Grid>
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Описание объявления
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Подробности и уникальные особенности помогут выделиться в
                    поиске.
                  </Text>
                </Box>
                <TextAreaField
                  field={description}
                  label="Текст объявления:"
                  placeholder="Текст объявления:"
                  size="3"
                  defaultValue={description.initialValue}
                  dataIsValid={description.valid}
                  errors={description.errors}
                  rows={6}
                  disabled={isPending}
                />
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Фотографии
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Добавьте изображения, чтобы клиенты увидели качество ваших
                    работ.
                  </Text>
                </Box>
                <DropzoneSurface p={{ initial: "3", md: "4" }}>
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
                    existingFilesLength={
                      existingImages.filter((image) => !image.toBeDeleted).length
                    }
                  />
                </DropzoneSurface>
                {(existingImages.length > 0 || selectedFiles.length > 0) && (
                  <Box>
                    <ImagesPreviewer
                      existingImages={existingImages}
                      images={selectedFiles}
                      setImages={setSelectedFiles}
                      setExistingImages={setExistingImages}
                      maxImages={MAX_FILES}
                    />
                  </Box>
                )}
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex
                direction="column"
                gap={{ initial: "4", md: "5" }}
              >
                <Box>
                  <Heading as="h2" size="4">
                    Контактные данные
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Эти данные будут использоваться для связи с вами и управления
                    объявлением.
                  </Text>
                </Box>

                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <BasicFormField
                    type="email"
                    field={email}
                    label="Email"
                    placeholder="@ Адрес электронной почты"
                    size="3"
                    defaultValue={fields.email.initialValue}
                    dataIsValid={email.valid}
                    errors={email.errors}
                    disabled={isPending}
                  >
                    <EnvelopeClosedIcon height="16" width="16" />
                  </BasicFormField>
                  <PhoneFormField
                    label="Телефон"
                    field={phoneNumber}
                    errors={phoneNumber.errors}
                    size="3"
                    defaultValue={phoneNumber.initialValue}
                    disabled={isPending}
                  >
                    <MobileIcon height="16" width="16" />
                  </PhoneFormField>
                </Grid>

                <Separator size="4" />

                <Flex
                  direction={{ initial: "column", md: "row" }}
                  align={{ initial: "stretch", md: "center" }}
                  justify="between"
                  gap={{ initial: "4", md: "6" }}
                >
                  <Checkbox
                    field={acceptTerms}
                    label="Я согласен с условиями"
                    errors={acceptTerms.errors}
                    disabled={isPending}
                  />

                  <SubmitButton
                    pending={isPending}
                    disabled={acceptTerms.value !== "on"}
                    text="Добавить объявление"
                  />
                  {/* <GoogleReCAPTCHA
                  submitButtonText="Добавить объявление"
                  isLoading={isPending}
                /> */}
                </Flex>
              </Flex>
            </SectionCard>
          </Flex>
        </FormShell>
      </form>
      <ErrorModal
        open={errorModalOpen}
        onOpenChange={handleModalClose}
        errorMessage={form.errors}
      />
    </>
  );
};

export default ProfessionalServicePublishForm;
