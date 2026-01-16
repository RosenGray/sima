import { Heading } from "@radix-ui/themes";
import { PublishAdVehiclesPageContainer } from "./page.styles";
import { FC } from "react";
import { FormMode, FormModeSchema } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import SpecialVehiclePublishForm from "../../../_components/vehicles/SpecialVehiclePublishForm/SpecialVehiclePublishForm";

interface PublishAdVehiclesPageProps {
  params: Promise<{ formMode: string }>;
}

const PublishAdVehiclesPage: FC<PublishAdVehiclesPageProps> = async ({
  params,
}) => {
  const { formMode } = await params;

  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success || formMode === FormMode.Edit)
    return notFound();

  return (
    <PublishAdVehiclesPageContainer>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <SpecialVehiclePublishForm formMode={FormMode.Create} />
    </PublishAdVehiclesPageContainer>
  );
};

export default PublishAdVehiclesPage;
