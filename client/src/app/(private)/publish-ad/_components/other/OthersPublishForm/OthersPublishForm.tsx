"use client";
import { FC, useEffect, useMemo, useState } from "react";
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  createOthersSchema,
} from "@/lib/other/types/others.schema";
import { SerializedOthers } from "@/lib/other/types/others.types";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Box, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import { useActionState } from "react";
import {
  getCitiesToSelectOptions,
  mapAreasToSelectOptions,
} from "@/lib/cities";
import SelectSingle from "@/components/Form/SelectSingle/SelectSingle";
import BasicFormField from "@/components/Form/BasicFormField/BasicFormField";
import TextAreaField from "@/components/Form/TextAreaField/TextAreaField";
import DropFilesInput from "@/components/Form/DropFilesInput/DropFilesInput";
import ImagesPreviewer from "@/components/ImagesPreviewer/ImagesPreviewer";
import PhoneFormField from "@/components/Form/PhoneFormField/PhoneFormField";
import Checkbox from "@/components/Form/Checkbox/Checkbox";
import { publishOthersAd } from "@/lib/other/actions/publishOthersAd";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import { ExistingImageItem } from "@/lib/files/uploadFiles";
import { FormMode } from "@/components/Form/types/form.types";
import { editOthersAd } from "@/lib/other/actions/editOthersAd";
import Loader from "@/components/Loader";
import {
  DropzoneSurface,
  FormShell,
  HeroCard,
  SectionCard,
} from "./OthersPublishForm.styles";
import {
  EnvelopeClosedIcon,
  MobileIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

const areasOptions = mapAreasToSelectOptions();

interface OthersPublishFormProps {
  entity?: SerializedOthers;
  formMode: FormMode;
}

const OthersPublishForm: FC<OthersPublishFormProps> = ({ entity, formMode }) => {
  const isCreateMode = formMode === FormMode.Create;
  const { user } = useAuth();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImageItem[]>(
    () => {
      return (
        entity?.images.map((image) => ({
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

  const updateOthersWithImagesToDelete = editOthersAd.bind(null, {
    othersPublicId: entity?.publicId as string,
    imagesToDelete,
    allImagesShouldBeDeleted,
  });

  const [formState, formAction, isPending] = useActionState(
    isCreateMode ? publishOthersAd : updateOthersWithImagesToDelete,
    undefined
  );

  const [form, fields] = useForm({
    defaultValue: {
      title: entity?.title || "",
      district: entity?.district || Districts.Center,
      city: entity?.city || "",
      description: entity?.description || "",
      contactName: entity?.contactName || "",
      contactPrimaryPhone: entity?.contactPrimaryPhone || "",
      contactSecondaryPhone: entity?.contactSecondaryPhone || "",
      contactEmail: entity?.contactEmail || user?.email || "",
      acceptTerms: entity?.acceptTerms ? "on" : null,
      images: [],
    },
    lastResult: formState,
    onValidate: ({ formData }) => {
      const updatedFormData = new FormData();

      for (const [key, value] of formData.entries()) {
        if (key !== "images") {
          updatedFormData.append(key, value);
        }
      }

      selectedFiles.forEach((file) => {
        updatedFormData.append("images", file);
      });

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
        schema: createOthersSchema({
          minNumberOfImages: allImagesShouldBeDeleted ? 1 : 0,
        }),
      });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const resetForm = () => {
    setSelectedFiles([]);
    setFormKey((prev) => prev + 1);
  };

  const handleModalClose = () => {
    resetForm();
    setErrorModalOpen(false);
  };

  const {
    title,
    district,
    city,
    description,
    contactName,
    contactPrimaryPhone,
    contactSecondaryPhone,
    contactEmail,
    acceptTerms,
    images,
  } = fields;

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
      <form key={formKey.toString()} action={formAction} {...getFormProps(form)}>
        <FormShell
          px={{ initial: "4", sm: "6", md: "8" }}
          py={{ initial: "5", md: "7" }}
        >
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
                    {isCreateMode
                      ? "Создать объявление"
                      : "Редактировать объявление"}
                  </Heading>
                  <Text
                    mt="2"
                    size={{ initial: "3", md: "4" }}
                    color="gray"
                    highContrast
                  >
                    Поделитесь ключевыми деталями, добавьте фотографии и
                    оставьте контакты — это займёт всего пару минут.
                  </Text>
                </Box>
              </Flex>
            </HeroCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Основная информация
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Укажите название и место.
                  </Text>
                </Box>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <BasicFormField
                    type="text"
                    field={title}
                    label="Название"
                    placeholder="Введите название"
                    size="3"
                    defaultValue={title.initialValue}
                    dataIsValid={title.valid}
                    errors={title.errors}
                    disabled={isPending}
                    isMandatory
                    disabledAutocomplete
                  />

                  <SelectSingle
                    label="Выберите район"
                    field={district}
                    placeholder="Выберите район"
                    options={areasOptions}
                    errors={district.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Выберите город"
                    field={city}
                    placeholder="Выберите город"
                    options={citiesOptions}
                    errors={city.errors}
                    isDisabled={isPending || !district.value}
                    isMandatory
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
                    Подробности помогут выделиться в поиске.
                  </Text>
                </Box>
                <TextAreaField
                  field={description}
                  label="Текст объявления:"
                  placeholder="Опишите объявление"
                  size="3"
                  defaultValue={description.initialValue}
                  dataIsValid={description.valid}
                  errors={description.errors}
                  rows={6}
                  disabled={isPending}
                  isMandatory
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
                    Добавьте изображения, чтобы привлечь больше внимания.
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
                    disabled={isPending}
                    existingFilesLength={
                      existingImages.filter((image) => !image.toBeDeleted)
                        .length
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
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Контактные данные
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Эти данные будут использоваться для связи с вами и
                    управления объявлением.
                  </Text>
                </Box>

                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <BasicFormField
                    type="text"
                    field={contactName}
                    label="Имя контакта"
                    placeholder="Введите имя"
                    size="3"
                    defaultValue={contactName.initialValue}
                    dataIsValid={contactName.valid}
                    errors={contactName.errors}
                    disabled={isPending}
                    isMandatory
                    disabledAutocomplete
                  >
                    <PersonIcon height="16" width="16" />
                  </BasicFormField>

                  <BasicFormField
                    type="email"
                    field={contactEmail}
                    label="Email"
                    placeholder="@ Адрес электронной почты"
                    size="3"
                    defaultValue={contactEmail.initialValue}
                    dataIsValid={contactEmail.valid}
                    errors={contactEmail.errors}
                    disabled={isPending}
                    isMandatory
                    disabledAutocomplete
                  >
                    <EnvelopeClosedIcon height="16" width="16" />
                  </BasicFormField>

                  <PhoneFormField
                    label="Основной телефон"
                    field={contactPrimaryPhone}
                    errors={contactPrimaryPhone.errors}
                    size="3"
                    defaultValue={contactPrimaryPhone.initialValue}
                    disabled={isPending}
                    isMandatory
                  >
                    <MobileIcon height="16" width="16" />
                  </PhoneFormField>

                  <PhoneFormField
                    label="Дополнительный телефон (необязательно)"
                    field={contactSecondaryPhone}
                    errors={contactSecondaryPhone.errors}
                    size="3"
                    defaultValue={contactSecondaryPhone.initialValue}
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
                    text={
                      isCreateMode ? "Добавить объявление" : "Сохранить изменения"
                    }
                  />
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

export default OthersPublishForm;
