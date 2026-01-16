import { Heading } from "@radix-ui/themes";
import { PublishAdVehiclesPageContainer } from "./page.styles";
import { FC } from "react";
import { FormMode, FormModeSchema } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import OffRoadVehiclePublishForm from "../../../_components/vehicles/OffRoadVehiclePublishForm/OffRoadVehiclePublishForm";

interface PublishAdOffRoadVehiclesPageProps {
  params: Promise<{ formMode: string }>;
}

const PublishAdOffRoadVehiclesPage: FC<PublishAdOffRoadVehiclesPageProps> = async ({
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
      <OffRoadVehiclePublishForm formMode={FormMode.Create} />
    </PublishAdVehiclesPageContainer>
  );
};

export default PublishAdOffRoadVehiclesPage;
