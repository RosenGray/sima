"use client";
import { FC, useEffect, useMemo, useState } from "react";
import SelectSingle from "@/components/Form/SelectSingle/SelectSingle";
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  ProfessionalServiceSchema,
  SerilizeProfessionalService,
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
} from "@/lib/service-categories/utils/professionals.utils";
import {
  getCitiesToSelectOptions,
  mapAreasToSelectOptions,
} from "@/lib/cities";
import TextAreaField from "@/components/Form/TextAreaField/TextAreaField";
import DropFilesInput from "@/components/Form/DropFilesInput/DropFilesInput";
import ImagesPreviewer from "@/components/ImagesPreviewer/ImagesPreviewer";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import BasicFormField from "@/components/Form/BasicFormField/BasicFormField";
import PhoneFormField from "@/components/Form/PhoneFormField/PhoneFormField";
import Checkbox from "@/components/Form/Checkbox/Checkbox";
import { publishProfessionalServiceAd } from "@/lib/professionals/professional-service/actions/publishProfessionalServiceAd";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import { ExistingImageItem } from "@/app/api/files/create/route";


const areasOptions = mapAreasToSelectOptions();

interface ProfessionalServicePublishFormProps {
  service?: SerilizeProfessionalService;
}

const ProfessionalServicePublishForm: FC<
  ProfessionalServicePublishFormProps
> = ({ service }) => {
  const { user } = useAuth();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const { mappedCategories } = usePublishAd();
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

  const [formState, formAction, isPending] = useActionState(
    publishProfessionalServiceAd,
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
    areaCode,
    acceptTerms,
    images,
  } = fields;

  console.log("category", category.value);
  console.log("subCategory", subCategory.value);
  // console.log("district", district.value);
  // console.log("city", city.value);
  // console.log("description", description.value);
  // console.log("email", email.value);
  // console.log("phoneNumber", phoneNumber.value);
  // console.log("areaCode", areaCode.value);
  // console.log("acceptTerms", acceptTerms.value);
  // console.log("images", images.value);

  const categoriesOptions = useMemo(
    () => mapServiceCategoriesToSelectOptions(mappedCategories),
    [mappedCategories]
  );
  const subCategoryOptions = useMemo(
    () =>
      mapServiceSubCategoriesToSelectOptions(mappedCategories, category.value),
    [mappedCategories, category.value]
  );
  console.log('subCategoryOptions',subCategoryOptions )
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

  return (
    <>
      <form
        key={formKey.toString()}
        action={formAction}
        {...getFormProps(form)}
      >
        <Box>
          <Grid columns="2" gap="4" mb="4">
            {/* category */}
            <SelectSingle
              label="Выберите доску"
              field={category}
              placeholder="Выберите доску"
              options={categoriesOptions}
              errors={category.errors}
              isDisabled={isPending}
              defaultValue={categoriesOptions[3]}
            />

            {/* subCategory */}
            <SelectSingle
              label="Выберите подкатегорию"
              field={subCategory}
              placeholder="Выберите подкатегорию"
              options={subCategoryOptions}
              errors={subCategory.errors}
              isDisabled={isPending}
              defaultValue={subCategoryOptions[0]}
            />

            {/* area */}
            <SelectSingle
              label="Выберите район"
              field={district}
              placeholder="Выберите район"
              options={areasOptions}
              errors={district.errors}
              isDisabled={isPending}
            />
            {/* city */}

            <SelectSingle
              label="Выберите город"
              field={city}
              placeholder="Выберите город"
              options={citiesOptions}
              errors={city.errors}
              isDisabled={isPending}
              // defaultValue={citiesOptions[0]}
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
            disabled={isPending}
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
            existingFilesLength={existingImages.filter((image) => !image.toBeDeleted).length}
          />
          {(existingImages.length > 0 || selectedFiles.length > 0) && (
            <Box mt="4" mb="4">
              <ImagesPreviewer
                existingImages={existingImages}
                images={selectedFiles}
                setImages={setSelectedFiles}
                setExistingImages={setExistingImages}
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
                disabled={isPending}
              >
                <EnvelopeClosedIcon height="16" width="16" />
              </BasicFormField>
              <PhoneFormField
                areaCodeField={areaCode}
                label="Телефон"
                field={phoneNumber}
                errors={phoneNumber.errors}
                size="3"
                defaultValue={phoneNumber.initialValue}
                disabled={isPending}
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
              disabled={isPending}
            />

            <SubmitButton
              pending={isPending}
              disabled={!acceptTerms.valid}
              text="Добавить объявление"
            />
            {/* <GoogleReCAPTCHA
              submitButtonText="Добавить объявление"
              isLoading={isPending}
            /> */}
          </Flex>
        </Box>
      </form>
      <ErrorModal open={errorModalOpen} onOpenChange={handleModalClose} />
    </>
  );
};

export default ProfessionalServicePublishForm;
