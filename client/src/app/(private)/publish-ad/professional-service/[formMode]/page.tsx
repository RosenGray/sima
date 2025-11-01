import { Heading } from "@radix-ui/themes";
import { PublishAdProfessionalsPageContainer } from "./page.styles";
import ProfessionalServicePublishForm from "../../_components/ProfessionalServicePublishForm/ProfessionalServicePublishForm";
import { FC } from "react";
import {
  FormMode,
  FormModeSchema,
} from "@/lib/professionals/professional-service/types";
import { notFound } from "next/navigation";

interface PublishAdProfessionalsPageProps {
  params: Promise<{ formMode: string }>;
}

const PublishAdProfessionalsPage: FC<PublishAdProfessionalsPageProps> = async ({
  params,
}) => {
  const { formMode } = await params;

  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success) return notFound();

  return (
    <PublishAdProfessionalsPageContainer>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <ProfessionalServicePublishForm formMode={FormMode.Create} />
    </PublishAdProfessionalsPageContainer>
  );
};

export default PublishAdProfessionalsPage;
