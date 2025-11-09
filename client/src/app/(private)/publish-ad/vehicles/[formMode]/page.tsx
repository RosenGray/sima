import { Heading } from "@radix-ui/themes";
import { PublishAdVehiclesPageContainer } from "./page.styles";
import { FC } from "react";
import { FormModeSchema } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";

interface PublishAdVehiclesPageProps {
  params: Promise<{ formMode: string }>;
}

const PublishAdVehiclesPage: FC<PublishAdVehiclesPageProps> = async ({
  params,
}) => {
  const { formMode } = await params;

  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success) return notFound();

  return (
    <PublishAdVehiclesPageContainer>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      {/* <ProfessionalServicePublishForm formMode={FormMode.Create} /> */}
    </PublishAdVehiclesPageContainer>
  );
};

export default PublishAdVehiclesPage;
