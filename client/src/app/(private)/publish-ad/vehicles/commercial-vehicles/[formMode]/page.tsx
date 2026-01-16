import { Heading } from "@radix-ui/themes";
import { PublishAdVehiclesPageContainer } from "./page.styles";
import { FC } from "react";
import { FormMode, FormModeSchema } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import CommercialVehiclePublishForm from "../../../_components/vehicles/CommercialVehiclePublishForm/CommercialVehiclePublishForm";

interface PublishAdCommercialVehiclesPageProps {
  params: Promise<{ formMode: string }>;
}

const PublishAdCommercialVehiclesPage: FC<PublishAdCommercialVehiclesPageProps> = async ({
  params,
}) => {
  const { formMode } = await params;

  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success || formMode === FormMode.Edit) return notFound();

  return (
    <PublishAdVehiclesPageContainer>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <CommercialVehiclePublishForm formMode={FormMode.Create} />
    </PublishAdVehiclesPageContainer>
  );
};

export default PublishAdCommercialVehiclesPage;
