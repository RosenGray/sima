"use client";
import { FC, useEffect, useMemo, useState } from "react";
import SelectSingle from "@/components/Form/SelectSingle/SelectSingle";
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  createCarSchema,
} from "@/lib/vehicles/cars/types/car.schema";
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
import { publishCarAd } from "@/lib/vehicles/cars/actions/publishCarAd";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import Loader from "@/components/Loader";
import {
  DropzoneSurface,
  FormShell,
  HeroCard,
  SectionCard,
} from "./CarPublishForm.styles";
import {
  mapVehicleManufacturersToSelectOptions,
} from "@/lib/vehicles/cars/vehicleManufacturers";
import {
  getVehicleModelsToSelectOptions,
} from "@/lib/vehicles/cars/vehicleModels";
import { TransmissionType, EngineType } from "@/lib/vehicles/cars/types/cars.types";

const areasOptions = mapAreasToSelectOptions();

// Map TransmissionType enum to select options
const transmissionOptions = Object.values(TransmissionType).map((value) => ({
  value,
  label:
    value === TransmissionType.MANUAL
      ? "Механическая"
      : value === TransmissionType.AUTOMATIC
      ? "Автоматическая"
      : value === TransmissionType.TIPTRONIC
      ? "Типтроник"
      : "Роботизированная",
  fieldKey: "transmission",
}));

// Map EngineType enum to select options
const engineTypeOptions = Object.values(EngineType).map((value) => ({
  value,
  label:
    value === EngineType.GASOLINE
      ? "Бензин"
      : value === EngineType.DIESEL
      ? "Дизель"
      : value === EngineType.TURBO_DIESEL
      ? "Турбодизель"
      : value === EngineType.HYBRID
      ? "Гибрид"
      : "Электрический",
  fieldKey: "engineType",
}));

const CarPublishForm: FC = () => {
  const { user } = useAuth();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [formState, formAction, isPending] = useActionState(
    publishCarAd,
    undefined
  );

  const [form, fields] = useForm({
    defaultValue: {
      manufacturer: "",
      model: "",
      yearOfManufacture: "",
      numberOfHand: "",
      transmission: "",
      engineType: "",
      engineCapacity: "",
      mileage: "",
      numberOfDoors: "",
      color: "",
      price: "",
      description: "",
      accessories: "",
      district: Districts.Center,
      city: "",
      contactName: "",
      contactPrimaryPhone: "",
      contactSecondaryPhone: "",
      contactEmail: user?.email || "",
      acceptTerms: null,
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
        schema: createCarSchema({ minNumberOfImages: 1 }),
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
    manufacturer,
    model,
    yearOfManufacture,
    numberOfHand,
    transmission,
    engineType,
    engineCapacity,
    mileage,
    numberOfDoors,
    color,
    price,
    description,
    accessories,
    district,
    city,
    contactName,
    contactPrimaryPhone,
    contactSecondaryPhone,
    contactEmail,
    acceptTerms,
    images,
  } = fields;

  const manufacturerOptions = useMemo(
    () => mapVehicleManufacturersToSelectOptions(),
    []
  );

  const modelOptions = useMemo(
    () =>
      manufacturer.value
        ? getVehicleModelsToSelectOptions(manufacturer.value as string)
        : [],
    [manufacturer.value]
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
                    Расскажите о вашем автомобиле
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
                    Укажите производителя, модель и основные характеристики
                    автомобиля.
                  </Text>
                </Box>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <SelectSingle
                    label="Производитель"
                    field={manufacturer}
                    placeholder="Выберите производителя"
                    options={manufacturerOptions}
                    errors={manufacturer.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Модель"
                    field={model}
                    placeholder="Выберите модель"
                    options={modelOptions}
                    errors={model.errors}
                    isDisabled={isPending || !manufacturer.value}
                    isMandatory
                  />

                  <BasicFormField
                    type="number"
                    field={yearOfManufacture}
                    label="Год выпуска"
                    placeholder="Год выпуска"
                    size="3"
                    defaultValue={yearOfManufacture.initialValue}
                    dataIsValid={yearOfManufacture.valid}
                    errors={yearOfManufacture.errors}
                    disabled={isPending}
                    isMandatory
                  />

                  <BasicFormField
                    type="text"
                    field={numberOfHand}
                    label="Количество рук"
                    placeholder="Количество рук"
                    size="3"
                    defaultValue={numberOfHand.initialValue}
                    dataIsValid={numberOfHand.valid}
                    errors={numberOfHand.errors}
                    disabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Коробка передач"
                    field={transmission}
                    placeholder="Выберите тип коробки передач"
                    options={transmissionOptions}
                    errors={transmission.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Тип двигателя"
                    field={engineType}
                    placeholder="Выберите тип двигателя"
                    options={engineTypeOptions}
                    errors={engineType.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <BasicFormField
                    type="number"
                    field={engineCapacity}
                    label="Объем двигателя (л)"
                    placeholder="Объем двигателя"
                    size="3"
                    defaultValue={engineCapacity.initialValue}
                    dataIsValid={engineCapacity.valid}
                    errors={engineCapacity.errors}
                    disabled={isPending}
                  />

                  <BasicFormField
                    type="number"
                    field={mileage}
                    label="Пробег (км)"
                    placeholder="Пробег"
                    size="3"
                    defaultValue={mileage.initialValue}
                    dataIsValid={mileage.valid}
                    errors={mileage.errors}
                    disabled={isPending}
                  />

                  <BasicFormField
                    type="number"
                    field={numberOfDoors}
                    label="Количество дверей"
                    placeholder="Количество дверей"
                    size="3"
                    defaultValue={numberOfDoors.initialValue}
                    dataIsValid={numberOfDoors.valid}
                    errors={numberOfDoors.errors}
                    disabled={isPending}
                  />

                  <BasicFormField
                    type="text"
                    field={color}
                    label="Цвет"
                    placeholder="Цвет"
                    size="3"
                    defaultValue={color.initialValue}
                    dataIsValid={color.valid}
                    errors={color.errors}
                    disabled={isPending}
                  />
                </Grid>
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Цена и описание
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Укажите цену и подробное описание автомобиля.
                  </Text>
                </Box>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <BasicFormField
                    type="number"
                    field={price}
                    label="Цена (₪)"
                    placeholder="Цена"
                    size="3"
                    defaultValue={price.initialValue}
                    dataIsValid={price.valid}
                    errors={price.errors}
                    disabled={isPending}
                    isMandatory
                  />
                </Grid>
                <TextAreaField
                  field={description}
                  label="Описание:"
                  placeholder="Опишите автомобиль..."
                  size="3"
                  defaultValue={description.initialValue}
                  dataIsValid={description.valid}
                  errors={description.errors}
                  rows={6}
                  disabled={isPending}
                  isMandatory
                />
                <TextAreaField
                  field={accessories}
                  label="Комплектация (необязательно):"
                  placeholder="Укажите комплектацию..."
                  size="3"
                  defaultValue={accessories.initialValue}
                  dataIsValid={accessories.valid}
                  errors={accessories.errors}
                  rows={4}
                  disabled={isPending}
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
                    Укажите район и город, где находится автомобиль.
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
                    Добавьте изображения автомобиля.
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
                    existingFilesLength={0}
                  />
                </DropzoneSurface>
                {selectedFiles.length > 0 && (
                  <Box>
                    <ImagesPreviewer
                      existingImages={[]}
                      images={selectedFiles}
                      setImages={setSelectedFiles}
                      setExistingImages={() => {}}
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
                    placeholder="Имя контакта"
                    size="3"
                    defaultValue={contactName.initialValue}
                    dataIsValid={contactName.valid}
                    errors={contactName.errors}
                    disabled={isPending}
                    isMandatory
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
                    text="Добавить объявление"
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

export default CarPublishForm;
