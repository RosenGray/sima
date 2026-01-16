import { Box, Heading } from "@radix-ui/themes";
import { FC } from "react";
import { FormModeSchema } from "@/components/Form/types/form.types";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { PublishAdVehiclesPageContainer } from "../page.styles";
import { offRoadVehicleRepository } from "@/lib/vehicles/off-road/repository/OffRoadVehicleRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import OffRoadVehiclePublishForm from "@/app/(private)/publish-ad/_components/vehicles/OffRoadVehiclePublishForm/OffRoadVehiclePublishForm";

interface EditPublishAdOffRoadVehiclesPageProps {
  params: Promise<{ formMode: string; id: string }>;
}

const EditPublishAdOffRoadVehiclesPage: FC<EditPublishAdOffRoadVehiclesPageProps> = async ({
  params,
}) => {
  const { formMode, id } = await params;
  const isCreateMode = formMode === FormMode.Create;

  //validate with schema
  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success || isCreateMode) return notFound();

  //get off-road vehicle
  const offRoadVehicle = await offRoadVehicleRepository.getByPublicId(id);
  if (!offRoadVehicle) return notFound();
  const isOwner = await thisUserIsOwner(offRoadVehicle.user.id);
  if (!isOwner) return notFound();

  return (
    <PublishAdVehiclesPageContainer>
      <Box mx="auto">
        <Heading mb="4" align="center">
          Редактирование объявления
        </Heading>
        <OffRoadVehiclePublishForm offRoadVehicle={offRoadVehicle} formMode={FormMode.Edit} />
      </Box>
    </PublishAdVehiclesPageContainer>
  );
};

export default EditPublishAdOffRoadVehiclesPage;
