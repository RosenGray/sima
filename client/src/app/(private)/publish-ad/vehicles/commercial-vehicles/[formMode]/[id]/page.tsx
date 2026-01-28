import { Box, Heading } from "@radix-ui/themes";
import { FC } from "react";
import { FormModeSchema } from "@/components/Form/types/form.types";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { PublishAdVehiclesPageContainer } from "../page.styles";
import { commercialVehicleRepository } from "@/lib/vehicles/commercial-vehicles/repository/CommercialVehicleRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import CommercialVehiclePublishForm from "@/app/(private)/publish-ad/_components/vehicles/CommercialVehiclePublishForm/CommercialVehiclePublishForm";

interface EditPublishAdCommercialVehiclesPageProps {
  params: Promise<{ formMode: string; id: string }>;
}

const EditPublishAdCommercialVehiclesPage: FC<EditPublishAdCommercialVehiclesPageProps> = async ({
  params,
}) => {
  const { formMode, id } = await params;
  const isCreateMode = formMode === FormMode.Create;

  //validate with schema
  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success || isCreateMode) return notFound();

  //get commercial vehicle
  const commercialVehicle = await commercialVehicleRepository.getByPublicId(id);
  if (!commercialVehicle) return notFound();
  const isOwner = await thisUserIsOwner(commercialVehicle.user.id);
  if (!isOwner) return notFound();

  return (
    <PublishAdVehiclesPageContainer>
      <Box mx="auto">
        <Heading mb="4" align="center">
          Редактирование объявления
        </Heading>
        <CommercialVehiclePublishForm commercialVehicle={commercialVehicle} formMode={FormMode.Edit} />
      </Box>
    </PublishAdVehiclesPageContainer>
  );
};

export default EditPublishAdCommercialVehiclesPage;
