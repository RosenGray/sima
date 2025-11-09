import { Box, Heading, Card } from "@radix-ui/themes";
import { PublishAdProfessionalsPageContainer } from "./page.styles";
import ProfessionalServicePublishForm from "../../../_components/ProfessionalServicePublishForm/ProfessionalServicePublishForm";
import { FC } from "react";
import { FormModeSchema } from "@/components/Form/types/form.types";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { PublishAdVehiclesPageContainer } from "../page.styles";

interface EditPublishAdVehiclesPageProps {
  params: Promise<{ formMode: string; id: string }>;
}

const EditPublishAdVehiclesPage: FC<EditPublishAdVehiclesPageProps> = async ({
  params,
}) => {
  const { formMode, id } = await params;
  const isCreateMode = formMode === FormMode.Create;

  //validate with schema
  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success || isCreateMode) return notFound();

  // //get service
  // const service = await professionalServiceRepository.getByPublicId(id);
  // if (!service) return notFound();
  // const isOwner = await thisUserIsOwner(service.user.id);
  // if (!isOwner) return notFound();

  return (
    <PublishAdVehiclesPageContainer>
      <Box maxWidth="80%" mx="auto">
        <Heading mb="4" align="center">
          Редактирование объявления
        </Heading>
        <Card>
          {/* <ProfessionalServicePublishForm
            service={service}
            formMode={FormMode.Edit}
          /> */}
        </Card>
      </Box>
    </PublishAdVehiclesPageContainer>
  );
};

export default EditPublishAdVehiclesPage;
