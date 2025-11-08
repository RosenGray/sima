import { Box, Heading, Card } from "@radix-ui/themes";
import { PublishAdProfessionalsPageContainer } from "./page.styles";
import ProfessionalServicePublishForm from "../../../_components/ProfessionalServicePublishForm/ProfessionalServicePublishForm";
import { FC } from "react";
import {
  FormMode,
  FormModeSchema,
} from "@/lib/professionals/professional-service/types";
import { notFound } from "next/navigation";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { PublishAdProvider } from "../../../_providers";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";

interface PublishAdProfessionalsPageProps {
  params: Promise<{ formMode: string; id: string }>;
}

const PublishAdProfessionalsPage: FC<PublishAdProfessionalsPageProps> = async ({
  params,
}) => {
  const { formMode, id } = await params;
  const isCreateMode = formMode === FormMode.Create;

  //validate with schema
  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success || isCreateMode) return notFound();

  //get service
  const service = await professionalServiceRepository.getByPublicId(id);
  if (!service) return notFound();
  const isOwner = await thisUserIsOwner(service.user.id);
  if (!isOwner) return notFound();
  const mappedCategories =
    await serviceCategoryRepository.getMappedCategories();

  return (
    <PublishAdProvider data={{ mappedCategories }}>
      <PublishAdProfessionalsPageContainer>
        <Box maxWidth="80%" mx="auto">
          <Heading mb="4" align="center">
            Редактирование объявления
          </Heading>
          <Card>
            <ProfessionalServicePublishForm
              service={service}
              formMode={FormMode.Edit}
            />
          </Card>
        </Box>
      </PublishAdProfessionalsPageContainer>
    </PublishAdProvider>
  );
};

export default PublishAdProfessionalsPage;
