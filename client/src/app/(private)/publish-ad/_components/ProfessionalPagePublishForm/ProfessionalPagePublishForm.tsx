"use client";

import { FC, useEffect, useMemo, useState } from "react";
import {
  createProfessionalPageSchema,
  MAX_FILE_SIZE,
  MAX_GALLERY_FILES,
} from "@/lib/professionals/professional-page/types/professional-page.schema";
import { SerializedProfessionalPage } from "@/lib/professionals/professional-page/types/professional-page.types";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
  IconButton,
} from "@radix-ui/themes";
import { useActionState } from "react";
import {
  mapServiceCategoriesToSelectOptions,
  mapServiceSubCategoriesToSelectOptions,
} from "@/lib/service-categories/utils/professionals.utils";
import {
  getCitiesToSelectOptions,
  mapAreasToSelectOptions,
} from "@/lib/cities";
import SelectSingle from "@/components/Form/SelectSingle/SelectSingle";
import TextAreaField from "@/components/Form/TextAreaField/TextAreaField";
import DropFilesInput from "@/components/Form/DropFilesInput/DropFilesInput";
import ImagesPreviewer from "@/components/ImagesPreviewer/ImagesPreviewer";
import BasicFormField from "@/components/Form/BasicFormField/BasicFormField";
import PhoneFormField from "@/components/Form/PhoneFormField/PhoneFormField";
import Checkbox from "@/components/Form/Checkbox/Checkbox";
import { publishProfessionalPage } from "@/lib/professionals/professional-page/actions/publishProfessionalPage";
import { editProfessionalPage } from "@/lib/professionals/professional-page/actions/editProfessionalPage";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import { ExistingImageItem } from "@/lib/files/uploadFiles";
import { FormMode } from "@/components/Form/types/form.types";
import Loader from "@/components/Loader";
import {
  DropzoneSurface,
  FormShell,
  HeroCard,
  ProfileImageWrap,
  SectionCard,
} from "./ProfessionalPagePublishForm.styles";
import { usePublishProfessionalServiceAd } from "../../_providers/PublishProfessionalServiceAdProvider";
import { generateSlug } from "@/utils/generateSlug";
import { EnvelopeClosedIcon, MobileIcon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const areasOptions = mapAreasToSelectOptions();

interface ProfessionalPagePublishFormProps {
  entity?: SerializedProfessionalPage;
  formMode: FormMode;
}

const ProfessionalPagePublishForm: FC<ProfessionalPagePublishFormProps> = ({
  entity,
  formMode,
}) => {
  const isCreateMode = formMode === FormMode.Create;
  const { user } = useAuth();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const { mappedCategories } = usePublishProfessionalServiceAd();

  const [selectedProfileFile, setSelectedProfileFile] = useState<File | null>(
    null
  );
  const [profileRemoved, setProfileRemoved] = useState(false);
  const existingProfileImage: ExistingImageItem | null = entity?.profileImage
    ? {
        ...entity.profileImage,
        id: entity.profileImage.uniqueName,
        isExisting: true,
        toBeDeleted: false,
      }
    : null;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImageItem[]>(
    () =>
      entity?.galleryImages?.map((img) => ({
        ...img,
        id: img.uniqueName,
        isExisting: true,
        toBeDeleted: false,
      })) ?? []
  );

  const galleryImagesToDelete = useMemo(
    () => existingImages.filter((i) => i.toBeDeleted),
    [existingImages]
  );
  const allGalleryImagesDeleted =
    existingImages.length > 0 && galleryImagesToDelete.length === existingImages.length;

  const profileImageToDelete =
    !isCreateMode && existingProfileImage && profileRemoved
      ? existingProfileImage
      : null;

  const editActionWithContext = editProfessionalPage.bind(null, {
    pagePublicId: entity?.publicId ?? "",
    profileImageToDelete,
    galleryImagesToDelete,
    allGalleryImagesDeleted,
  });

  const [formState, formAction, isPending] = useActionState(
    isCreateMode ? publishProfessionalPage : editActionWithContext,
    undefined
  );

  const [form, fields] = useForm({
    key: formKey.toString(),
    defaultValue: {
      displayName: entity?.displayName ?? "",
      description: entity?.description ?? "",
      slug:
        entity?.slug ??
        (user
          ? generateSlug(user.firstName ?? "", user.lastName ?? "")
          : ""),
      category: entity?.category?.id ?? "",
      subCategory: entity?.subCategory?.id ?? "",
      district: entity?.district ?? Districts.Center,
      city: entity?.city ?? "",
      contactPhone: entity?.contactPhone ?? "",
      contactEmail: entity?.contactEmail ?? user?.email ?? "",
      whatsapp: entity?.socialLinks?.whatsapp ?? "",
      instagram: entity?.socialLinks?.instagram ?? "",
      facebook: entity?.socialLinks?.facebook ?? "",
      website: entity?.socialLinks?.website ?? "",
      isPublished: entity?.isPublished !== false ? "on" : null,
      acceptTerms: entity ? "on" : null,
    },
    lastResult: formState,
    onValidate: ({ formData }) => {
      const updatedFormData = new FormData();
      for (const [key, value] of formData.entries()) {
        if (key !== "profileImage" && key !== "galleryImages") {
          updatedFormData.append(key, value as string);
        }
      }
      if (selectedProfileFile && selectedProfileFile.size > 0) {
        updatedFormData.append("profileImage", selectedProfileFile);
      }
      selectedFiles.forEach((f) => updatedFormData.append("galleryImages", f));
      const currentGallery = formData.getAll("galleryImages");
      currentGallery.forEach((file) => {
        if (
          file instanceof File &&
          file.size > 0 &&
          file.name !== "undefined" &&
          !selectedFiles.some((f) => f.name === file.name)
        ) {
          updatedFormData.append("galleryImages", file);
        }
      });
      return parseWithZod(updatedFormData, {
        schema: createProfessionalPageSchema({
          minGalleryImages: allGalleryImagesDeleted ? 1 : 0,
        }),
      });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const resetForm = () => {
    setSelectedFiles([]);
    setSelectedProfileFile(null);
    setProfileRemoved(false);
    setFormKey((k) => k + 1);
  };

  const handleModalClose = () => {
    resetForm();
    setErrorModalOpen(false);
  };

  const {
    displayName,
    description,
    slug,
    category,
    subCategory,
    district,
    city,
    contactPhone,
    contactEmail,
    whatsapp,
    instagram,
    facebook,
    website,
    isPublished,
    acceptTerms,
    profileImage,
    galleryImages,
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
    if (formState && typeof formState === "object" && "error" in formState) {
      setErrorModalOpen(true);
    }
    if (formState && typeof formState === "object" && "formErrors" in formState && (formState.formErrors?.length ?? 0) > 0) {
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

  const slugPreview =
    typeof slug.value === "string" && slug.value
      ? `${process.env.NEXT_PUBLIC_CLIENT_URL ?? ""}/professional/${String(slug.value).toLowerCase().replace(/\s+/g, "-")}`
      : "";

  return (
    <>
      <form
        key={formKey}
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
                      ? "Создание персональной страницы"
                      : "Редактирование страницы"}
                  </Heading>
                  <Text
                    mt="2"
                    size={{ initial: "3", md: "4" }}
                    color="gray"
                    highContrast
                  >
                    Заполните данные — имя, описание, контакты и фото.
                  </Text>
                </Box>
              </Flex>
            </HeroCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Heading as="h2" size="4">
                  Основные данные
                </Heading>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <BasicFormField
                    type="text"
                    field={displayName}
                    label="Имя (отображаемое)"
                    placeholder="Иван Иванов"
                    size="3"
                    errors={displayName.errors}
                    disabled={isPending}
                    isMandatory
                  />
                  <BasicFormField
                    type="text"
                    field={slug}
                    label="Адрес страницы (slug)"
                    placeholder="ivanov-ivan"
                    size="3"
                    errors={slug.errors}
                    disabled={isPending}
                    isMandatory
                  />
                </Grid>
                {slugPreview && (
                  <Text size="2" color="gray">
                    Предпросмотр:{" "}
                    <Text as="span" weight="medium" style={{ wordBreak: "break-all" }}>
                      {slugPreview}
                    </Text>
                  </Text>
                )}
                <TextAreaField
                  field={description}
                  label="Описание"
                  placeholder="Расскажите о себе и услугах"
                  size="3"
                  dataIsValid={description.valid}
                  errors={description.errors}
                  rows={5}
                  disabled={isPending}
                  isMandatory
                />
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Heading as="h2" size="4">
                  Фото профиля
                </Heading>
                <Text color="gray" size="2" mt="2">
                  Одно фото для аватара (по желанию).
                </Text>
                {existingProfileImage && !profileRemoved && !selectedProfileFile && (
                  <Flex align="center" gap="3">
                    <ProfileImageWrap>
                      <Image
                        src={existingProfileImage.url}
                        alt={existingProfileImage.originalName}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="120px"
                      />
                    </ProfileImageWrap>
                    <IconButton
                      type="button"
                      color="red"
                      variant="soft"
                      onClick={() => setProfileRemoved(true)}
                      aria-label="Удалить фото"
                    >
                      <TrashIcon width={18} height={18} />
                    </IconButton>
                  </Flex>
                )}
                {selectedProfileFile && (
                  <Flex align="center" gap="3">
                    <ProfileImageWrap
                      style={{
                        position: "relative",
                        width: 120,
                        height: 120,
                      }}
                    >
                      <img
                        src={URL.createObjectURL(selectedProfileFile)}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "var(--radius-3)",
                        }}
                      />
                    </ProfileImageWrap>
                    <IconButton
                      type="button"
                      color="gray"
                      variant="soft"
                      onClick={() => setSelectedProfileFile(null)}
                      aria-label="Убрать фото"
                    >
                      <TrashIcon width={18} height={18} />
                    </IconButton>
                  </Flex>
                )}
                {!selectedProfileFile &&
                  (!existingProfileImage || profileRemoved) && (
                    <DropzoneSurface p={{ initial: "3", md: "4" }}>
                      <DropFilesInput
                        accept={{
                          "image/png": [],
                          "image/jpeg": [],
                          "image/jpg": [],
                          "image/webp": [],
                        }}
                        maxSize={MAX_FILE_SIZE}
                        maxFiles={1}
                        field={profileImage}
                        errors={profileImage.errors}
                        onFilesDrop={(files) =>
                          setSelectedProfileFile(files[0] ?? null)
                        }
                        files={selectedProfileFile ? [selectedProfileFile] : []}
                        disabled={isPending}
                      />
                    </DropzoneSurface>
                  )}
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Heading as="h2" size="4">
                  Галерея
                </Heading>
                <Text color="gray" size="2" mt="2">
                  До {MAX_GALLERY_FILES} фото (по желанию).
                </Text>
                <DropzoneSurface p={{ initial: "3", md: "4" }}>
                  <DropFilesInput
                    accept={{
                      "image/png": [],
                      "image/jpeg": [],
                      "image/jpg": [],
                      "image/webp": [],
                    }}
                    maxSize={MAX_FILE_SIZE}
                    maxFiles={MAX_GALLERY_FILES}
                    field={galleryImages}
                    errors={galleryImages.errors}
                    onFilesDrop={setSelectedFiles}
                    files={selectedFiles}
                    disabled={isPending}
                    existingFilesLength={
                      existingImages.filter((i) => !i.toBeDeleted).length
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
                      maxImages={MAX_GALLERY_FILES}
                    />
                  </Box>
                )}
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Heading as="h2" size="4">
                  Категория и район
                </Heading>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <SelectSingle
                    label="Категория услуг"
                    field={category}
                    placeholder="Выберите категорию"
                    options={categoriesOptions}
                    errors={category.errors}
                    isDisabled={isPending}
                  />
                  <SelectSingle
                    label="Подкатегория"
                    field={subCategory}
                    placeholder="Выберите подкатегорию"
                    options={subCategoryOptions}
                    errors={subCategory.errors}
                    isDisabled={isPending}
                  />
                  <SelectSingle
                    label="Район"
                    field={district}
                    placeholder="Выберите район"
                    options={areasOptions}
                    errors={district.errors}
                    isDisabled={isPending}
                  />
                  <SelectSingle
                    label="Город"
                    field={city}
                    placeholder="Выберите город"
                    options={citiesOptions}
                    errors={city.errors}
                    isDisabled={isPending}
                  />
                </Grid>
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Heading as="h2" size="4">
                  Контакты
                </Heading>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <BasicFormField
                    type="email"
                    field={contactEmail}
                    label="Email"
                    placeholder="email@example.com"
                    size="3"
                    errors={contactEmail.errors}
                    disabled={isPending}
                    disabledAutocomplete
                  >
                    <EnvelopeClosedIcon height="16" width="16" />
                  </BasicFormField>
                  <PhoneFormField
                    label="Телефон"
                    field={contactPhone}
                    errors={contactPhone.errors}
                    size="3"
                    defaultValue={contactPhone.initialValue}
                    disabled={isPending}
                  >
                    <MobileIcon height="16" width="16" />
                  </PhoneFormField>
                </Grid>
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap={{ initial: "4", md: "5" }}>
                <Heading as="h2" size="4">
                  Соцсети и сайт
                </Heading>
                <Grid
                  columns={{ initial: "1", md: "2" }}
                  gap={{ initial: "4", md: "5" }}
                >
                  <BasicFormField
                    type="text"
                    field={whatsapp}
                    label="WhatsApp"
                    placeholder="Номер или ссылка"
                    size="3"
                    errors={whatsapp.errors}
                    disabled={isPending}
                  />
                  <BasicFormField
                    type="text"
                    field={instagram}
                    label="Instagram"
                    placeholder="@username"
                    size="3"
                    errors={instagram.errors}
                    disabled={isPending}
                  />
                  <BasicFormField
                    type="text"
                    field={facebook}
                    label="Facebook"
                    placeholder="Ссылка на профиль"
                    size="3"
                    errors={facebook.errors}
                    disabled={isPending}
                  />
                  <BasicFormField
                    type="text"
                    field={website}
                    label="Сайт"
                    placeholder="https://..."
                    size="3"
                    errors={website.errors}
                    disabled={isPending}
                  />
                </Grid>
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap="4">
                <Checkbox
                  field={isPublished}
                  label="Опубликовать страницу (видна другим)"
                  errors={isPublished.errors}
                  disabled={isPending}
                />
                <Separator size="4" />
                <Flex
                  direction={{ initial: "column", md: "row" }}
                  align={{ initial: "stretch", md: "center" }}
                  justify="between"
                  gap="4"
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
                        ? "Создать страницу"
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

export default ProfessionalPagePublishForm;
