import { Heading } from "@radix-ui/themes";
import { PublishAdProfessionalsPageContainer } from "./page.styles";
import ProfessionalServicePublishForm from "../../_components/ProfessionalServicePublishForm/ProfessionalServicePublishForm";
import { FC } from "react";
import {
  FormMode,
  FormModeSchema,
} from "@/lib/professionals/professional-service/types";
import { notFound } from "next/navigation";
import PublishProfessionalServiceAdProvider from "../../_providers/PublishProfessionalServiceAdProvider";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";

interface PublishAdProfessionalsPageProps {
  params: Promise<{ formMode: string }>;
}

const PublishAdProfessionalsPage: FC<PublishAdProfessionalsPageProps> = async ({
  params,
}) => {
  const { formMode } = await params;

  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success) return notFound();

  const mappedCategories =
    await serviceCategoryRepository.getMappedCategories();

  return (
    <PublishProfessionalServiceAdProvider data={{ mappedCategories }}>
          <PublishAdProfessionalsPageContainer>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <ProfessionalServicePublishForm formMode={FormMode.Create} />
    </PublishAdProfessionalsPageContainer>
    </PublishProfessionalServiceAdProvider>
  );
};

export default PublishAdProfessionalsPage;
//EvlxnANwna