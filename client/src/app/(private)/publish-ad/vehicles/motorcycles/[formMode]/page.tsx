import { Heading } from "@radix-ui/themes";
import { PublishAdVehiclesPageContainer } from "./page.styles";
import { FC } from "react";
import { FormMode, FormModeSchema } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import MotorcyclePublishForm from "../../../_components/vehicles/MotorcyclePublishForm/MotorcyclePublishForm";

interface PublishAdMotorcyclesPageProps {
  params: Promise<{ formMode: string }>;
}

const PublishAdMotorcyclesPage: FC<PublishAdMotorcyclesPageProps> = async ({
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
      <MotorcyclePublishForm formMode={FormMode.Create} />
    </PublishAdVehiclesPageContainer>
  );
};

export default PublishAdMotorcyclesPage;
