import { Box, Heading, Card } from "@radix-ui/themes";
import { PublishAdProfessionalsPageContainer } from "./page.styles";
import ProfessionalServicePublishForm from "../../_components/ProfessionalServicePublishForm/ProfessionalServicePublishForm";
import { FC } from "react";
import { FormModeSchema } from "@/lib/professionals/professional-service/types";
import { notFound } from "next/navigation";

interface PublishAdProfessionalsPageProps {
  params: Promise<{ formMode: string }>;
}

const PublishAdProfessionalsPage: FC<PublishAdProfessionalsPageProps> = async ({
  params,
}) => {
  const { formMode } = await params;
  //validate with schema
  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success) return notFound();

  

  console.log("formModewithoutid", formMode);

  return (
    <PublishAdProfessionalsPageContainer>
      <Box>
        <Heading mb="4" align="center">
          Добавление нового объявления
        </Heading>
        <Card>
          <ProfessionalServicePublishForm />
        </Card>
      </Box>
    </PublishAdProfessionalsPageContainer>
  );
};

export default PublishAdProfessionalsPage;
