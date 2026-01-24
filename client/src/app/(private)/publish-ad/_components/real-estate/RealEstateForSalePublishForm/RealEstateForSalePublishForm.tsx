"use client";
import { FC, useEffect, useMemo, useState } from "react";
import SelectSingle from "@/components/Form/SelectSingle/SelectSingle";
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  createRealEstateForSaleSchema,
} from "@/lib/real-estate/for-sale/types/realEstateForSale.schema";
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
import { publishRealEstateForSaleAd } from "@/lib/real-estate/for-sale/actions/publishRealEstateForSaleAd";
import { editRealEstateForSaleAd } from "@/lib/real-estate/for-sale/actions/editRealEstateForSaleAd";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import { ExistingImageItem } from "@/lib/files/uploadFiles";
import { FormMode } from "@/components/Form/types/form.types";
import { SerializedRealEstateForSale } from "@/lib/real-estate/for-sale/types/realEstateForSale.types";
import Loader from "@/components/Loader";
import {
  DropzoneSurface,
  FormShell,
  HeroCard,
  SectionCard,
} from "./RealEstateForSalePublishForm.styles";
import PriceFormField from "@/components/Form/PriceFormField/PriceFormField";
import CheckboxButtonGroup from "@/components/Form/CheckboxButtonGroup/CheckboxButtonGroup";
import { ADDITIONAL_FEATURES_OPTIONS } from "@/lib/real-estate/for-sale/additionalFeaturesOptions";
import {
  getPropertyKindOptions,
  getAirConditioningOptions,
  getParkingOptions,
  getFurnitureOptions,
  getEntryDateOptions,
  getNumberOfRoomsOptions,
  getYearOptionsForSelect,
  getMonthOptions,
  getDayOptions,
  getFloorOptions,
  getBalconyOptions,
} from "@/lib/real-estate/for-sale/utils/realEstateOptions";

const areasOptions = mapAreasToSelectOptions();

interface RealEstateForSalePublishFormProps {
  realEstate?: SerializedRealEstateForSale;
  formMode: FormMode;
}

const RealEstateForSalePublishForm: FC<RealEstateForSalePublishFormProps> = ({
  realEstate,
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
        realEstate?.images.map((image) => ({
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

  const updateRealEstateWithImagesToDelete = editRealEstateForSaleAd.bind(
    null,
    {
      realEstatePublicId: realEstate?.publicId as string,
      imagesToDelete,
      allImagesShouldBeDeleted,
    }
  );

  const [formState, formAction, isPending] = useActionState(
    isCreateMode
      ? publishRealEstateForSaleAd
      : updateRealEstateWithImagesToDelete,
    undefined
  );

  const [form, fields] = useForm({
    defaultValue: {
      propertyKind: realEstate?.propertyKind?.toString() || "",
      district: realEstate?.district || Districts.Center,
      city: realEstate?.city || "",
      streetname: realEstate?.streetname || "",
      numberOfRooms: realEstate?.numberOfRooms?.toString() || "",
      airconditioning: realEstate?.airconditioning?.toString() || "",
      balcony: realEstate?.balcony?.toString() || "",
      parking: realEstate?.parking?.toString() || "",
      squaremeter: realEstate?.squaremeter?.toString() || "",
      propertyTax: realEstate?.propertyTax?.toString() || "",
      floor: realEstate?.floor?.toString() || "",
      totalflors: realEstate?.totalflors?.toString() || "",
      additionalFeatures: (realEstate?.additionalFeatures ?? []).map(String),
      furniture: realEstate?.furniture?.toString() || "",
      furnitureDescription: realEstate?.furnitureDescription || "",
      description: realEstate?.description || "",
      price: realEstate?.price?.toString() || "",
      year: realEstate?.year?.toString() || "",
      month: realEstate?.month?.toString() || "",
      day: realEstate?.day?.toString() || "",
      entryDate: realEstate?.entryDate?.toString() || "",
      contactName: realEstate?.contactName || "",
      contactPrimaryPhone: realEstate?.contactPrimaryPhone || "",
      contactSecondaryPhone: realEstate?.contactSecondaryPhone || "",
      contactEmail: realEstate?.contactEmail || user?.email || "",
      acceptTerms: realEstate?.acceptTerms ? "on" : null,
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
        schema: createRealEstateForSaleSchema({
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
    propertyKind,
    district,
    city,
    streetname,
    numberOfRooms,
    airconditioning,
    balcony,
    parking,
    squaremeter,
    propertyTax,
    floor,
    totalflors,
    additionalFeatures,
    furniture,
    furnitureDescription,
    description,
    price,
    year,
    month,
    day,
    entryDate,
    contactName,
    contactPrimaryPhone,
    contactSecondaryPhone,
    contactEmail,
    acceptTerms,
    images,
  } = fields;

  const propertyKindOptions = useMemo(() => getPropertyKindOptions(), []);
  const airConditioningOptions = useMemo(
    () => getAirConditioningOptions(),
    []
  );
  const parkingOptions = useMemo(() => getParkingOptions(), []);
  const furnitureOptions = useMemo(() => getFurnitureOptions(), []);
  const entryDateOptions = useMemo(() => getEntryDateOptions(), []);
  const numberOfRoomsOptions = useMemo(() => getNumberOfRoomsOptions(), []);
  const yearOptions = useMemo(() => getYearOptionsForSelect(), []);
  const monthOptions = useMemo(() => getMonthOptions(), []);
  const dayOptions = useMemo(() => getDayOptions(), []);
  const floorOptions = useMemo(() => getFloorOptions(), []);
  const balconyOptions = useMemo(() => getBalconyOptions(), []);

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
                    Добавьте объявление о недвижимости на продажу
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
                    Укажите тип недвижимости, район, город и улицу.
                  </Text>
                </Box>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
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
                </Grid>
              </Flex>
            </SectionCard>

            {/* Property Details Section */}
            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Детали недвижимости
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Укажите количество комнат, площадь, этаж и другие параметры.
                  </Text>
                </Box>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <SelectSingle
                    label="Количество комнат"
                    field={numberOfRooms}
                    placeholder="Выберите количество комнат"
                    options={numberOfRoomsOptions}
                    errors={numberOfRooms.errors}
                    isDisabled={isPending}
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

                  <SelectSingle
                    label="Этаж"
                    field={floor}
                    placeholder="Выберите этаж"
                    options={floorOptions}
                    errors={floor.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Всего этажей"
                    field={totalflors}
                    placeholder="Выберите общее количество этажей"
                    options={floorOptions}
                    errors={totalflors.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Балкон"
                    field={balcony}
                    placeholder="Выберите количество балконов"
                    options={balconyOptions}
                    errors={balcony.errors}
                    isDisabled={isPending}
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
                    Укажите кондиционер, парковку, мебель и дополнительные особенности.
                  </Text>
                </Box>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <SelectSingle
                    label="Кондиционер"
                    field={airconditioning}
                    placeholder="Выберите тип кондиционера"
                    options={airConditioningOptions}
                    errors={airconditioning.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Парковка"
                    field={parking}
                    placeholder="Выберите тип парковки"
                    options={parkingOptions}
                    errors={parking.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Мебель"
                    field={furniture}
                    placeholder="Выберите наличие мебели"
                    options={furnitureOptions}
                    errors={furniture.errors}
                    isDisabled={isPending}
                    isMandatory
                  />
                </Grid>

                <CheckboxButtonGroup
                  field={additionalFeatures}
                  label="Дополнительные особенности"
                  subLabel="Отметьте дополнительные особенности недвижимости."
                  options={ADDITIONAL_FEATURES_OPTIONS}
                  errors={additionalFeatures.errors}
                  isDisabled={isPending}
                />

                <TextAreaField
                  field={furnitureDescription}
                  label="Описание мебели (необязательно)"
                  placeholder="Опишите мебель..."
                  size="3"
                  defaultValue={furnitureDescription.initialValue}
                  dataIsValid={furnitureDescription.valid}
                  errors={furnitureDescription.errors}
                  rows={4}
                  disabled={isPending}
                />
              </Flex>
            </SectionCard>

            {/* Entry Details Section */}
            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Box>
                  <Heading as="h2" size="4">
                    Дата въезда
                  </Heading>
                  <Text color="gray" size="2" mt="2">
                    Укажите дату и тип въезда.
                  </Text>
                </Box>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <SelectSingle
                    label="Тип въезда"
                    field={entryDate}
                    placeholder="Выберите тип въезда"
                    options={entryDateOptions}
                    errors={entryDate.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Год"
                    field={year}
                    placeholder="Выберите год"
                    options={yearOptions}
                    errors={year.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="Месяц"
                    field={month}
                    placeholder="Выберите месяц"
                    options={monthOptions}
                    errors={month.errors}
                    isDisabled={isPending}
                    isMandatory
                  />

                  <SelectSingle
                    label="День"
                    field={day}
                    placeholder="Выберите день"
                    options={dayOptions}
                    errors={day.errors}
                    isDisabled={isPending}
                    isMandatory
                  />
                </Grid>
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
                    Укажите цену и налог на недвижимость.
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

                  <BasicFormField
                    type="number"
                    field={propertyTax}
                    label="Налог на недвижимость за два месяца (необязательно)"
                    placeholder="Введите налог"
                    size="3"
                    defaultValue={propertyTax.initialValue}
                    dataIsValid={propertyTax.valid}
                    errors={propertyTax.errors}
                    disabled={isPending}
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

            {/* Contact Section */}
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

export default RealEstateForSalePublishForm;
