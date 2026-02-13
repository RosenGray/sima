"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import BasicFormField from "@/components/Form/BasicFormField/BasicFormField";
import SelectSingle from "@/components/Form/SelectSingle/SelectSingle";
import TextAreaField from "@/components/Form/TextAreaField/TextAreaField";
import DropFilesInput from "@/components/Form/DropFilesInput/DropFilesInput";
import ImagesPreviewer from "@/components/ImagesPreviewer/ImagesPreviewer";
import PhoneFormField from "@/components/Form/PhoneFormField/PhoneFormField";
import Checkbox from "@/components/Form/Checkbox/Checkbox";
import { SubmitButton } from "@/components/buttons/SubmitButton/SubmitButton";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import Loader from "@/components/Loader";
import {
  createProfessionalPageEditSchema,
  MAX_FILE_SIZE,
  MAX_GALLERY_FILES,
} from "@/lib/professionals/professional-page/schema/professional-page-edit.schema";
import { SerializedProfessionalPage } from "@/lib/professionals/professional-page/types/professional-page.types";
import { ExistingImageItem } from "@/lib/files/uploadFiles";
import { editProfessionalPage } from "@/lib/professionals/professional-page/actions/editProfessionalPage";
import { Districts } from "@/lib/cities/types/cities.schema";
import {
  mapServiceCategoriesToSelectOptions,
  mapServiceSubCategoriesToSelectOptions,
} from "@/lib/service-categories/utils/professionals.utils";
import {
  getCitiesToSelectOptions,
  mapAreasToSelectOptions,
} from "@/lib/cities";
import { usePublishProfessionalServiceAd } from "@/app/(private)/publish-ad/_providers/PublishProfessionalServiceAdProvider";
import {
  DropzoneSurface,
  FormShell,
  HeroCard,
  SectionCard,
} from "./ProfessionalPageEditForm.styles";
import { EnvelopeClosedIcon, MobileIcon } from "@radix-ui/react-icons";

const areasOptions = mapAreasToSelectOptions();

interface ProfessionalPageEditFormProps {
  page: SerializedProfessionalPage;
}

const ProfessionalPageEditForm: FC<ProfessionalPageEditFormProps> = ({
  page,
}) => {
  const [formKey, setFormKey] = useState(0);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [selectedProfileFile, setSelectedProfileFile] = useState<File | null>(
    null
  );
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<File[]>([]);
  const [existingProfileImage, setExistingProfileImage] = useState<
    ExistingImageItem | null
  >(() =>
    page.profileImage
      ? {
          ...page.profileImage,
          isExisting: true,
          toBeDeleted: false,
        }
      : null
  );
  const [existingGalleryImages, setExistingGalleryImages] = useState<
    ExistingImageItem[]
  >(
    () =>
      page.galleryImages?.map((img) => ({
        ...img,
        isExisting: true,
        toBeDeleted: false,
      })) ?? []
  );

  const galleryImagesToDelete = useMemo(
    () => existingGalleryImages.filter((img) => img.toBeDeleted),
    [existingGalleryImages]
  );
  const allGalleryImagesDeleted =
    existingGalleryImages.length > 0 &&
    galleryImagesToDelete.length === existingGalleryImages.length &&
    selectedGalleryFiles.length === 0;

  const boundAction = editProfessionalPage.bind(null, {
    pagePublicId: page.publicId,
    profileImageToDelete:
      existingProfileImage?.toBeDeleted ? existingProfileImage : null,
    galleryImagesToDelete: galleryImagesToDelete,
    allGalleryImagesDeleted,
  });

  const [formState, formAction, isPending] = useActionState(
    boundAction,
    undefined
  );

  const { mappedCategories } = usePublishProfessionalServiceAd();

  const [form, fields] = useForm({
    key: formKey,
    defaultValue: {
      displayName: page.displayName ?? "",
      description: page.description ?? "",
      category: page.category?.id ?? "",
      subCategory: page.subCategory?.id ?? "",
      district: page.district ?? Districts.Center,
      city: page.city ?? "",
      contactPhone: page.contactPhone ?? "",
      contactEmail: page.contactEmail ?? "",
      whatsapp: page.socialLinks?.whatsapp ?? "",
      instagram: page.socialLinks?.instagram ?? "",
      facebook: page.socialLinks?.facebook ?? "",
      website: page.socialLinks?.website ?? "",
      isPublished: page.isPublished ? "on" : null,
    },
    lastResult: formState,
    onValidate: ({ formData }) => {
      const updatedFormData = new FormData();
      for (const [key, value] of formData.entries()) {
        if (key !== "profileImage" && key !== "galleryImages") {
          updatedFormData.append(key, value);
        }
      }
      if (selectedProfileFile) {
        updatedFormData.append("profileImage", selectedProfileFile);
      }
      selectedGalleryFiles.forEach((file) => {
        updatedFormData.append("galleryImages", file);
      });
      return parseWithZod(updatedFormData, {
        schema: createProfessionalPageEditSchema({
          minGalleryImages: allGalleryImagesDeleted ? 1 : 0,
        }),
      });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const {
    displayName,
    description,
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
    if (formState && Array.isArray((formState as { formErrors?: string[] }).formErrors)) {
      setErrorModalOpen(true);
    }
  }, [formState]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.delete("profileImage");
    fd.delete("galleryImages");
    if (selectedProfileFile) {
      fd.append("profileImage", selectedProfileFile);
    }
    selectedGalleryFiles.forEach((f) => fd.append("galleryImages", f));
    formAction(undefined, fd);
  };

  const handleModalClose = () => {
    setErrorModalOpen(false);
    setFormKey((k) => k + 1);
  };

  if (isPending) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: "400px" }}>
        <Loader size="xlarge" />
      </Flex>
    );
  }

  return (
    <>
      <form
        key={formKey}
        {...getFormProps(form)}
        onSubmit={handleSubmit}
      >
        <FormShell px={{ initial: "4", sm: "6", md: "8" }} py={{ initial: "5", md: "7" }}>
          <Flex
            direction="column"
            gap={{ initial: "5", md: "6" }}
            align={{ initial: "stretch", md: "center" }}
          >
            <HeroCard variant="surface" size="4">
              <Heading as="h1" size={{ initial: "6", md: "7" }}>
                Редактирование страницы
              </Heading>
              <Text size="2" color="gray" mt="2">
                Измените данные и сохраните.
              </Text>
            </HeroCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap="4">
                <Heading as="h2" size="4">
                  Основное
                </Heading>
                <BasicFormField
                  type="text"
                  field={displayName}
                  label="Имя для отображения"
                  placeholder="Как вас показывать"
                  size="3"
                  errors={displayName.errors}
                  disabled={isPending}
                  isMandatory
                />
                <TextAreaField
                  field={description}
                  label="Описание"
                  placeholder="Опишите услуги"
                  size="3"
                  errors={description.errors}
                  disabled={isPending}
                  isMandatory
                  rows={6}
                />
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap="4">
                <Heading as="h2" size="4">
                  Фото профиля
                </Heading>
                <Text size="2" color="gray">
                  Одно фото (аватар).
                </Text>
                <DropzoneSurface p="3">
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
                    existingFilesLength={
                      existingProfileImage && !existingProfileImage.toBeDeleted
                        ? 1
                        : 0
                    }
                  />
                </DropzoneSurface>
                {(existingProfileImage || selectedProfileFile) && (
                  <Box>
                    <ImagesPreviewer
                      existingImages={
                        existingProfileImage
                          ? [existingProfileImage]
                          : []
                      }
                      images={selectedProfileFile ? [selectedProfileFile] : []}
                      setImages={(files) =>
                        setSelectedProfileFile(files[0] ?? null)
                      }
                      setExistingImages={(imgs) =>
                        setExistingProfileImage(imgs[0] ?? null)
                      }
                      maxImages={1}
                    />
                  </Box>
                )}
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap="4">
                <Heading as="h2" size="4">
                  Галерея
                </Heading>
                <Text size="2" color="gray">
                  До {MAX_GALLERY_FILES} фото.
                </Text>
                <DropzoneSurface p="3">
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
                    onFilesDrop={setSelectedGalleryFiles}
                    files={selectedGalleryFiles}
                    disabled={isPending}
                    existingFilesLength={
                      existingGalleryImages.filter((i) => !i.toBeDeleted).length
                    }
                  />
                </DropzoneSurface>
                {(existingGalleryImages.length > 0 ||
                  selectedGalleryFiles.length > 0) && (
                  <Box>
                    <ImagesPreviewer
                      existingImages={existingGalleryImages}
                      images={selectedGalleryFiles}
                      setImages={setSelectedGalleryFiles}
                      setExistingImages={setExistingGalleryImages}
                      maxImages={MAX_GALLERY_FILES}
                    />
                  </Box>
                )}
              </Flex>
            </SectionCard>

            <SectionCard variant="surface" size="4">
              <Flex direction="column" gap="4">
                <Heading as="h2" size="4">
                  Категория и место
                </Heading>
                <Grid columns={{ initial: "1", md: "2" }} gap="4">
                  <SelectSingle
                    label="Категория"
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
              <Flex direction="column" gap="4">
                <Heading as="h2" size="4">
                  Контакты
                </Heading>
                <Grid columns={{ initial: "1", md: "2" }} gap="4">
                  <BasicFormField
                    type="email"
                    field={contactEmail}
                    label="Email"
                    placeholder="email@example.com"
                    size="3"
                    errors={contactEmail.errors}
                    disabled={isPending}
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
              <Flex direction="column" gap="4">
                <Heading as="h2" size="4">
                  Соцсети и сайт
                </Heading>
                <Grid columns={{ initial: "1", md: "2" }} gap="4">
                  <BasicFormField
                    type="text"
                    field={whatsapp}
                    label="WhatsApp"
                    placeholder="Ссылка или номер"
                    size="3"
                    errors={whatsapp.errors}
                    disabled={isPending}
                  />
                  <BasicFormField
                    type="text"
                    field={instagram}
                    label="Instagram"
                    placeholder="Ссылка"
                    size="3"
                    errors={instagram.errors}
                    disabled={isPending}
                  />
                  <BasicFormField
                    type="text"
                    field={facebook}
                    label="Facebook"
                    placeholder="Ссылка"
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
                  label="Страница опубликована (видна по ссылке)"
                  errors={isPublished.errors}
                  disabled={isPending}
                />
                <Separator size="4" />
                <SubmitButton
                  pending={isPending}
                  text="Сохранить изменения"
                />
              </Flex>
            </SectionCard>
          </Flex>
        </FormShell>
      </form>
      <ErrorModal
        open={errorModalOpen}
        onOpenChange={handleModalClose}
        errorMessage={
          formState && typeof formState === "object" && "formErrors" in formState
            ? (formState.formErrors as string[])
            : form.errors
        }
      />
    </>
  );
};

export default ProfessionalPageEditForm;
