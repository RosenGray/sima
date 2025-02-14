"use client";
import { Heading, Box, Flex, Grid, Skeleton } from "@radix-ui/themes";
import {
  getCitiesToSelectOptions,
  getAreasToSelectOptions,
} from "@/utils/cities";
import { useQuery } from "@tanstack/react-query";
import { getServiceCategoriesMapping } from "../../_lib/actions";
import Form from "@/components/formManager/Form/Form";
import {
  mapServiceCategoriesToSelectOptions,
  mapServiceSubCategoriesToSelectOptions,
} from "../../_lib/utils";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { professionalsMutateAction } from "../../_lib/serverActions";
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  professionalMutationSchema,
} from "../../_lib/validations/professionalMutationSchema";
import SelectSingle from "@/components/formManager/SelectSingle/SelectSingle";
import TextAreaField from "@/components/formManager/TextAreaField/TextAreaField";
import DropFilesInput from "@/components/formManager/DropFilesInput/DropFilesInput";
import SkeletonLoader from "@/components/SkeletonLoader/SkeletonLoader";
import ImagesPreviewer from "@/components/ImagesPreviewer/ImagesPreviewer";
import classes from "./ProfessionalsPublishForm.module.scss";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import BasicFormField from "@/components/formManager/BasicFormField/BasicFormField";
import PhoneFormField from "@/components/formManager/PhoneFormField/PhoneFormField";
import ReCAPTCHA from "@/components/GoogleReCAPTCHA/GoogleReCAPTCHA";
import { useState } from "react";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import Checkbox from "@/components/formManager/Checkbox/Checkbox";
const areas = getAreasToSelectOptions();
const cities = getCitiesToSelectOptions();
const citiesOptions = [...areas, ...cities];

export const ProfessionalsPublishForm = () => {
  const [formState, formAction] = useFormState(professionalsMutateAction, {
    isErrorFromTheServer: false,
    isSuccess: false,
  });
  const [prevImages, setPrevImages] = useState<File[]>([]);

  const [form, fields] = useForm({
    defaultValue: {
      images: [],
      description: "test",
    },
    lastResult: formState,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: professionalMutationSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["serviceCategoriesMapping"],
    queryFn: () => getServiceCategoriesMapping(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const {
    category,
    subCategory,
    city,
    description,
    images,
    email,
    phoneNumber,
    areaCode,
    acceptTerms,
  } = fields;
console.log('prevImages',prevImages)
console.log('images.value ',images.value )
  const renderForm = () => {
    if (isLoading) return <SkeletonLoader />;

    if (!data) {
      throw new Error("Not implemented");
    }

    const categoriesOptions = mapServiceCategoriesToSelectOptions(data);
    const subCategoryOptions = mapServiceSubCategoriesToSelectOptions(
      data,
      category.value
    );
    return (
      <Form
        action={(x) => {
          console.log("x", x.get("acceptTerms"));
        }}
        {...getFormProps(form)}
      >
        {(formStatus) => {
          return (
            <Skeleton loading={isLoading}>
              <Box>
                <Grid columns="2" gap="4" mb="4">
                  <Flex direction="column" gap="2">
                    {/* category */}
                    <SelectSingle
                      label="Выберите доску"
                      field={category}
                      placeholder="Выберите доску"
                      options={categoriesOptions}
                      defaultValue={categoriesOptions[0]}
                      errors={category.errors}
                    />
                  </Flex>
                  {/* subCategory */}
                  <Flex direction="column" gap="2">
                    <SelectSingle
                      label="Выберите подкатегорию"
                      field={subCategory}
                      placeholder="Выберите подкатегорию"
                      options={subCategoryOptions}
                      defaultValue={subCategoryOptions[0]}
                      errors={subCategory.errors}
                    />
                  </Flex>
                  {/* city */}
                  <Flex
                    direction="column"
                    gap="2"
                    style={{ gridColumn: "1 / -1" }}
                  >
                    <SelectSingle
                      label="Выберите город"
                      field={city}
                      placeholder="Выберите город"
                      options={citiesOptions}
                      errors={city.errors}
                    />
                  </Flex>
                </Grid>
                {/* description */}
                <TextAreaField
                  field={description}
                  key={description.key}
                  label="Текст объявления:"
                  placeholder="Текст объявления:"
                  size="3"
                  defaultValue={description.initialValue}
                  className={classes.AuthLayout__TextFieldRoot}
                  dataIsValid={description.valid}
                  errors={description.errors}
                  rows={5}
                  mb="5px"
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
                  key={images.key}
                  field={images}
                  errors={images.errors}
                  onFilesDrop={setPrevImages}
                />
                {(images.value || prevImages.length > 0) && (
                  <Box mt="4" mb="4">
                    <ImagesPreviewer images={images.value || prevImages} />
                  </Box>
                )}

                {/* Contact Information */}
                <Box mt="4">
                  <Heading size="4" mb="2">
                    Контактная информация
                  </Heading>
                  <Grid columns="2" gap="4">
                    <BasicFormField
                      {...getInputProps(fields.email, { type: "email" })}
                      key={email.key}
                      label="Email"
                      anotherLabel="*виден только администрации сайта и не отображается публично"
                      placeholder="@ Адрес электронной почты"
                      size="3"
                      defaultValue={fields.email.initialValue}
                      dataIsValid={email.valid}
                      errors={email.errors}
                      // disabled={pending || loading}
                    >
                      <EnvelopeClosedIcon height="16" width="16" />
                    </BasicFormField>
                    <PhoneFormField
                      areaCodeField={areaCode}
                      label="Телефон"
                      field={phoneNumber}
                      errors={phoneNumber.errors}
                      size="3"
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
                    defaultChecked={Boolean(acceptTerms.initialValue)}
                    field={acceptTerms}
                    label="Я согласен с условиями"
                  />
                  <ReCAPTCHA submitButtonText="Добавить объявление" />
                </Flex>
              </Box>
            </Skeleton>
          );
        }}
      </Form>
    );
  };

  return <>{renderForm()}</>;
};

export default ProfessionalsPublishForm;
