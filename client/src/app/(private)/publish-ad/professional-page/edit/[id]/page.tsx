import { Box, Heading } from "@radix-ui/themes";
import { PublishAdProfessionalPageContainer } from "../../page.styles";
import ProfessionalPagePublishForm from "../../../_components/ProfessionalPagePublishForm/ProfessionalPagePublishForm";
import { FC } from "react";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { professionalPageRepository } from "@/lib/professionals/professional-page/repository/ProfessionalPageRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import PublishProfessionalServiceAdProvider from "../../../_providers/PublishProfessionalServiceAdProvider";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";

interface EditProfessionalPageProps {
  params: Promise<{ id: string }>;
}

const EditProfessionalPage: FC<EditProfessionalPageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const entity = await professionalPageRepository.getByPublicId(id);
  if (!entity) return notFound();

  const isOwner = await thisUserIsOwner(entity.user.id);
  if (!isOwner) return notFound();

  const mappedCategories =
    await serviceCategoryRepository.getMappedCategories();

  return (
    <PublishProfessionalServiceAdProvider data={{ mappedCategories }}>
      <PublishAdProfessionalPageContainer>
        <Box mx="auto">
          <Heading mb="4" align="center">
            Редактирование персональной страницы
          </Heading>
          <ProfessionalPagePublishForm
            entity={entity}
            formMode={FormMode.Edit}
          />
        </Box>
      </PublishAdProfessionalPageContainer>
    </PublishProfessionalServiceAdProvider>
  );
};

export default EditProfessionalPage;
