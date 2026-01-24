"use client";
import { FC, useEffect, useMemo, useState } from "react";
import SelectSingle from "@/components/Form/SelectSingle/SelectSingle";
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  createPetForFreeSchema,
} from "@/lib/pets/for-free/types/petForFree.schema";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Box, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import { useActionState } from "react";
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
import { publishPetForFreeAd } from "@/lib/pets/for-free/actions/publishPetForFreeAd";
import { editPetForFreeAd } from "@/lib/pets/for-free/actions/editPetForFreeAd";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import { ExistingImageItem } from "@/lib/files/uploadFiles";
import { FormMode } from "@/components/Form/types/form.types";
import { SerializedPetForFree } from "@/lib/pets/for-free/types/petForFree.types";
import Loader from "@/components/Loader";
import {
  DropzoneSurface,
  FormShell,
  HeroCard,
  SectionCard,
} from "./PetForFreePublishForm.styles";
import {
  mapAnimalsToSelectOptions,
  getKindsToSelectOptions,
} from "@/lib/pets/animals";
import {
  PetGender,
  PetAge,
} from "@/lib/pets/for-sale/types/petForSale.types";
import { ADJUSTMENT_OPTIONS } from "@/lib/pets/for-sale/adjustmentOptions";
import CheckboxButtonGroup from "@/components/Form/CheckboxButtonGroup/CheckboxButtonGroup";

const areasOptions = mapAreasToSelectOptions();

const genderOptions = Object.values(PetGender)
  .filter((value): value is PetGender => typeof value === "number")
  .map((value) => ({
    value: value.toString(),
    label: value === PetGender.MALE ? "Мальчик" : "Девочка",
    fieldKey: "gender",
  }));

const ageOptions = Object.values(PetAge)
  .filter((value): value is PetAge => typeof value === "number")
  .map((value) => ({
    value: value.toString(),
    label:
      value === PetAge.PUPPY
        ? "Щенок"
        : value === PetAge.YOUNG
          ? "Молодой"
          : value === PetAge.ADULT
            ? "Взрослый"
            : "Старший",
    fieldKey: "age",
  }));

interface PetForFreePublishFormProps {
  pet?: SerializedPetForFree;
  formMode: FormMode;
}

const PetForFreePublishForm: FC<PetForFreePublishFormProps> = ({
  pet,
  formMode,
}) => {
  const isCreateMode = formMode === FormMode.Create;
  const { user } = useAuth();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImageItem[]>(
    () => {
      return (
        pet?.images.map((image) => ({
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

  const updatePetWithImagesToDelete = editPetForFreeAd.bind(null, {
    petPublicId: pet?.publicId as string,
    imagesToDelete,
    allImagesShouldBeDeleted,
  });

  const [formState, formAction, isPending] = useActionState(
    isCreateMode ? publishPetForFreeAd : updatePetWithImagesToDelete,
    undefined
  );

  const [form, fields] = useForm({
    defaultValue: {
      animal: pet?.animal || "",
      kind: pet?.kind || "",
      gender: pet?.gender?.toString() || "",
      age: pet?.age?.toString() || "",
      description: pet?.description || "",
      district: pet?.district || Districts.Center,
      city: pet?.city || "",
      contactName: pet?.contactName || "",
      contactPrimaryPhone: pet?.contactPrimaryPhone || "",
      contactSecondaryPhone: pet?.contactSecondaryPhone || "",
      contactEmail: pet?.contactEmail || user?.email || "",
      acceptTerms: pet?.acceptTerms ? "on" : null,
      images: [],
      adjustments: (pet?.adjustments ?? []).map(String),
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
        schema: createPetForFreeSchema({
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
    animal,
    kind,
    gender,
    age,
    description,
    district,
    city,
    contactName,
    contactPrimaryPhone,
    contactSecondaryPhone,
    contactEmail,
    acceptTerms,
    images,
    adjustments,
  } = fields;

  const animalOptions = useMemo(() => mapAnimalsToSelectOptions(), []);

  const kindOptions = useMemo(
    () =>
      animal.value ? getKindsToSelectOptions(animal.value as string) : [],
    [animal.value]
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
                    Отдайте питомца бесплатно
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
                    Основные параметры
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Укажите животное, вид и основные характеристики питомца.
                  </Text>
                </Box>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <SelectSingle
                    label="Животное"
                    field={animal}
                    placeholder="Выберите животное"
                    options={animalOptions}
                    errors={animal.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Вид"
                    field={kind}
                    placeholder="Выберите вид"
                    options={kindOptions}
                    errors={kind.errors}
                    isDisabled={isPending || !animal.value}
                    isMandatory
                  />

                  <SelectSingle
                    label="Пол"
                    field={gender}
                    placeholder="Выберите пол"
                    options={genderOptions}
                    errors={gender.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Возраст"
                    field={age}
                    placeholder="Выберите возраст"
                    options={ageOptions}
                    errors={age.errors}
                    isDisabled={isPending}
                    isMandatory
                  />
                </Grid>
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Описание
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Опишите питомца для потенциальных новых хозяев.
                  </Text>
                </Box>
                <TextAreaField
                  field={description}
                  label="Описание:"
                  placeholder="Опишите питомца..."
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
                    Местоположение
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Укажите район и город, где находится питомец.
                  </Text>
                </Box>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
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
                    defaultValue={citiesOptions[0]}
                    isMandatory
                  />
                </Grid>
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Фотографии
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Добавьте изображения питомца.
                    <Text as="span" size="5" weight="bold" color="tomato">
                      *
                    </Text>
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
                    Важные особенности
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Отметьте особенности питомца.
                  </Text>
                </Box>
                <CheckboxButtonGroup
                  field={adjustments}
                  label="Важные особенности"
                  subLabel="Отметьте особенности питомца."
                  options={ADJUSTMENT_OPTIONS}
                  errors={adjustments.errors}
                  isDisabled={isPending}
                />
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
                    placeholder="Имя контакта"
                    size="3"
                    defaultValue={contactName.initialValue}
                    dataIsValid={contactName.valid}
                    errors={contactName.errors}
                    disabled={isPending}
                    isMandatory
                    disabledAutocomplete
                  />

                  <PhoneFormField
                    label="Основной телефон"
                    field={contactPrimaryPhone}
                    errors={contactPrimaryPhone.errors}
                    size="3"
                    defaultValue={contactPrimaryPhone.initialValue}
                    isMandatory
                    disabled={isPending}
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

                  <BasicFormField
                    type="email"
                    field={contactEmail}
                    containerStyle={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                    }}
                    label="Email"
                    placeholder="@ Адрес электронной почты"
                    size="3"
                    defaultValue={contactEmail.initialValue}
                    dataIsValid={contactEmail.valid}
                    errors={contactEmail.errors}
                    disabled={isPending}
                    isMandatory
                  >
                    <EnvelopeClosedIcon height="16" width="16" />
                  </BasicFormField>
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
                    isMandatory
                  />

                  <SubmitButton
                    pending={isPending}
                    disabled={acceptTerms.value !== "on"}
                    text={
                      isCreateMode
                        ? "Добавить объявление"
                        : "Сохранить изменения"
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

export default PetForFreePublishForm;
