import { Box, Heading, Card } from "@radix-ui/themes";
import { PublishAdProfessionalsPageContainer } from "./page.styles";
import ProfessionalServicePublishForm from "../../../_components/ProfessionalServicePublishForm/ProfessionalServicePublishForm";
import { FC } from "react";
import { FormMode, FormModeSchema } from "@/lib/professionals/professional-service/types";
import { notFound } from "next/navigation";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";

interface PublishAdProfessionalsPageProps {
  params: Promise<{ formMode:string; id:string }>;
}

const PublishAdProfessionalsPage: FC<PublishAdProfessionalsPageProps> = async ({ params }) => {
  const { formMode, id } = await params;
  const isCreateMode = formMode === FormMode.Create;

  //validate with schema
  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success || isCreateMode) return notFound();

  //get service
  const service = await professionalServiceRepository.getByPublicId(id);
  if (!service) return notFound();


  return (
    <PublishAdProfessionalsPageContainer>
      <Box>
        <Heading mb="4" align="center">
          Добавление нового объявления id
        </Heading>
        <Card>
          <ProfessionalServicePublishForm service={service} formMode={FormMode.Edit}/>
        </Card>
      </Box>
    </PublishAdProfessionalsPageContainer>
  );
};

export default PublishAdProfessionalsPage;
