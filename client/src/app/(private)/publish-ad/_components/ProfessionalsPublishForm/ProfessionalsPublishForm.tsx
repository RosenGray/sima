"use client";
import { FC, useState } from "react";
import SelectSingle from "@/components/Form/SelectSingle/SelectSingle";
import { createProfessional } from "@/lib/professionals/actions/login";
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  ProfessionalSchema,
} from "@/lib/professionals/types/professionals.scema";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Box, Grid } from "@radix-ui/themes";
import { useActionState } from "react";
import { usePublishAd } from "../../_providers/PublishAdProvider";
import {
  mapServiceCategoriesToSelectOptions,
  mapServiceSubCategoriesToSelectOptions,
} from "@/lib/professionals/utils/proffesionals.utils";
import {
  getCitiesToSelectOptions,
  mapAreasToSelectOptions,
} from "@/lib/cities";
import TextAreaField from "@/components/Form/TextAreaField/TextAreaField";
import Form from "@/components/Form/Form";
import DropFilesInput from "@/components/Form/DropFilesInput/DropFilesInput";
import ImagesPreviewer from "@/components/ImagesPreviewer/ImagesPreviewer";

const areasOptions = mapAreasToSelectOptions();

const ProfessionalsPublishForm: FC = () => {
  const { mappedCategories } = usePublishAd();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formState, formAction] = useActionState(createProfessional, undefined);
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
  const categoriesOptions =
    mapServiceCategoriesToSelectOptions(mappedCategories);
  const subCategoryOptions = mapServiceSubCategoriesToSelectOptions(
    mappedCategories,
    category.value
  );
  const citiesOptions = getCitiesToSelectOptions(district.value as Districts);

  return (
    <>
      <Form action={formAction} {...getFormProps(form)} noValidate>
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
                isDisabled={false}
              />

              {/* subCategory */}

              <SelectSingle
                label="Выберите подкатегорию"
                field={subCategory}
                placeholder="Выберите подкатегорию"
                options={subCategoryOptions}
                defaultValue={subCategoryOptions[0]}
                errors={subCategory.errors}
                isDisabled={false}
              />
              {/* area */}
              <SelectSingle
                label="Выберите район"
                field={district}
                placeholder="Выберите район"
                options={areasOptions}
                defaultValue={areasOptions[0]}
                errors={district.errors}
                isDisabled={false}
              />
              {/* city */}

              <SelectSingle
                label="Выберите город"
                field={city}
                placeholder="Выберите город"
                defaultValue={citiesOptions[0]}
                options={citiesOptions}
                errors={city.errors}
                isDisabled={false}
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
              disabled={false}
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
          </Box>
        )}
      </Form>
    </>
  );
};

export default ProfessionalsPublishForm;
