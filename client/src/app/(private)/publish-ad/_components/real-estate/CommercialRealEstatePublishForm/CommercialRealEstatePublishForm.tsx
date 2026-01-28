"use client";
import { FC, useEffect, useMemo, useState } from "react";
import SelectSingle from "@/components/Form/SelectSingle/SelectSingle";
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  createCommercialRealEstateSchema,
} from "@/lib/real-estate/commercial-real-estate/types/commercialRealEstate.schema";
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
import BasicFormField from "@/components/Form/BasicFormField/BasicFormField";
import PhoneFormField from "@/components/Form/PhoneFormField/PhoneFormField";
import Checkbox from "@/components/Form/Checkbox/Checkbox";
import { publishCommercialRealEstateAd } from "@/lib/real-estate/commercial-real-estate/actions/publishCommercialRealEstateAd";
import { editCommercialRealEstateAd } from "@/lib/real-estate/commercial-real-estate/actions/editCommercialRealEstateAd";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import { ExistingImageItem } from "@/lib/files/uploadFiles";
import { FormMode } from "@/components/Form/types/form.types";
import { SerializedCommercialRealEstate } from "@/lib/real-estate/commercial-real-estate/types/commercialRealEstate.types";
import Loader from "@/components/Loader";
import {
  DropzoneSurface,
  FormShell,
  HeroCard,
  SectionCard,
} from "./CommercialRealEstatePublishForm.styles";
import PriceFormField from "@/components/Form/PriceFormField/PriceFormField";
import CheckboxButtonGroup from "@/components/Form/CheckboxButtonGroup/CheckboxButtonGroup";
import {
  getDealKindOptions,
  getPropertyKindOptions,
} from "@/lib/real-estate/commercial-real-estate/utils/commercialRealEstateOptions";
import { ADDITIONAL_FEATURES_OPTIONS } from "@/lib/real-estate/commercial-real-estate/additionalFeaturesOptions";

interface CommercialRealEstatePublishFormProps {
  commercialRealEstate?: SerializedCommercialRealEstate;
  formMode: FormMode;
}

const CommercialRealEstatePublishForm: FC<
  CommercialRealEstatePublishFormProps
> = ({ commercialRealEstate, formMode }) => {
  const isCreateMode = formMode === FormMode.Create;
  const { user } = useAuth();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImageItem[]>(
    () => {
      return (
        commercialRealEstate?.images.map((image) => ({
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

  const updateCommercialRealEstateWithImagesToDelete =
    editCommercialRealEstateAd.bind(null, {
      commercialRealEstatePublicId: commercialRealEstate?.publicId as string,
      imagesToDelete,
      allImagesShouldBeDeleted,
    });

  const [formState, formAction, isPending] = useActionState(
    isCreateMode
      ? publishCommercialRealEstateAd
      : updateCommercialRealEstateWithImagesToDelete,
    undefined
  );

  const [form, fields] = useForm({
    defaultValue: {
      dealKind: commercialRealEstate?.dealKind?.toString() || "",
      propertyKind: commercialRealEstate?.propertyKind?.toString() || "",
      district: commercialRealEstate?.district || Districts.Center,
      city: commercialRealEstate?.city || "",
      streetname: commercialRealEstate?.streetname || "",
      squaremeter: commercialRealEstate?.squaremeter?.toString() || "",
      additionalFeatures: (commercialRealEstate?.additionalFeatures ?? []).map(
        String
      ),
      description: commercialRealEstate?.description || "",
      price: commercialRealEstate?.price?.toString() || "",
      contactName: commercialRealEstate?.contactName || "",
      contactPrimaryPhone: commercialRealEstate?.contactPrimaryPhone || "",
      contactSecondaryPhone: commercialRealEstate?.contactSecondaryPhone || "",
      contactEmail: commercialRealEstate?.contactEmail || user?.email || "",
      acceptTerms: commercialRealEstate?.acceptTerms ? "on" : null,
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
        schema: createCommercialRealEstateSchema({
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
    dealKind,
    propertyKind,
    district,
    city,
    streetname,
    squaremeter,
    additionalFeatures,
    description,
    price,
    contactName,
    contactPrimaryPhone,
    contactSecondaryPhone,
    contactEmail,
    acceptTerms,
    images,
  } = fields;

  const dealKindOptions = useMemo(() => getDealKindOptions(), []);
  const propertyKindOptions = useMemo(() => getPropertyKindOptions(), []);
  const areasOptions = useMemo(() => mapAreasToSelectOptions(), []);

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
                      ? "Добавьте объявление о коммерческой недвижимости"
                      : "Редактировать объявление о коммерческой недвижимости"}
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

            {/* Property Information Section */}
            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Информация о недвижимости
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Укажите тип сделки, тип недвижимости, район, город и улицу.
                  </Text>
                </Box>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <SelectSingle
                    label="Тип сделки"
                    field={dealKind}
                    placeholder="Выберите тип сделки"
                    options={dealKindOptions}
                    errors={dealKind.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Тип недвижимости"
                    field={propertyKind}
                    placeholder="Выберите тип"
                    options={propertyKindOptions}
                    errors={propertyKind.errors}
                    isDisabled={isPending}
                    isMandatory
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

                  <BasicFormField
                    type="text"
                    field={streetname}
                    label="Название улицы"
                    placeholder="Введите название улицы"
                    size="3"
                    defaultValue={streetname.initialValue}
                    dataIsValid={streetname.valid}
                    errors={streetname.errors}
                    disabled={isPending}
                    isMandatory
                  />

                  <BasicFormField
                    type="number"
                    field={squaremeter}
                    label="Площадь (м²)"
                    placeholder="Введите площадь"
                    size="3"
                    defaultValue={squaremeter.initialValue}
                    dataIsValid={squaremeter.valid}
                    errors={squaremeter.errors}
                    disabled={isPending}
                    isMandatory
                  />
                </Grid>
              </Flex>
            </SectionCard>

            {/* Features Section */}
            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Особенности
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Отметьте дополнительные особенности недвижимости.
                  </Text>
                </Box>
                <CheckboxButtonGroup
                  field={additionalFeatures}
                  label="Дополнительные особенности"
                  subLabel="Отметьте дополнительные особенности недвижимости."
                  options={ADDITIONAL_FEATURES_OPTIONS}
                  errors={additionalFeatures.errors}
                  isDisabled={isPending}
                />
              </Flex>
            </SectionCard>

            {/* Financial Section */}
            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Финансовые условия
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Укажите цену.
                  </Text>
                </Box>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <PriceFormField
                    field={price}
                    label="Цена"
                    placeholder="0"
                    size="3"
                    defaultValue={price.initialValue}
                    dataIsValid={price.valid}
                    errors={price.errors}
                    disabled={isPending}
                    isMandatory
                  />
                </Grid>
              </Flex>
            </SectionCard>

            {/* Description Section */}
            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Описание
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Опишите недвижимость подробно.
                  </Text>
                </Box>
                <TextAreaField
                  field={description}
                  label="Описание:"
                  placeholder="Опишите недвижимость..."
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

            {/* Images Section */}
            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Фотографии
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Добавьте изображения недвижимости.
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
                    onFilesDrop={(files) => setSelectedFiles(files)}
                    files={selectedFiles}
                    errors={images.errors}
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

            <Separator size="4" />

            {/* Contact Information Section */}
            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Контактная информация
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Укажите контактные данные для связи.
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
                  />

                  <BasicFormField
                    type="email"
                    field={contactEmail}
                    label="Электронная почта"
                    placeholder="Введите email"
                    size="3"
                    defaultValue={contactEmail.initialValue}
                    dataIsValid={contactEmail.valid}
                    errors={contactEmail.errors}
                    disabled={isPending}
                    isMandatory
                    showEmailDisclaimer
                  />

                  <PhoneFormField
                    field={contactPrimaryPhone}
                    label="Основной телефон"
                    placeholder="Введите номер телефона"
                    size="3"
                    defaultValue={contactPrimaryPhone.initialValue}
                    errors={contactPrimaryPhone.errors}
                    disabled={isPending}
                    isMandatory
                  />

                  <PhoneFormField
                    field={contactSecondaryPhone}
                    label="Дополнительный телефон (необязательно)"
                    placeholder="Введите номер телефона"
                    size="3"
                    defaultValue={contactSecondaryPhone.initialValue}
                    errors={contactSecondaryPhone.errors}
                    disabled={isPending}
                  />
                </Grid>
              </Flex>
            </SectionCard>

            <Separator size="4" />

            {/* Terms Section */}
            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Checkbox
                  field={acceptTerms}
                  label="Я согласен с условиями использования"
                  size="3"
                  errors={acceptTerms.errors}
                  disabled={isPending}
                  isMandatory
                />
              </Flex>
            </SectionCard>

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

export default CommercialRealEstatePublishForm;
