import { Box, Heading } from "@radix-ui/themes";
import { FC } from "react";
import { FormModeSchema } from "@/components/Form/types/form.types";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { PublishAdVehiclesPageContainer } from "../page.styles";
import { scooterRepository } from "@/lib/vehicles/scooters/repository/ScooterRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import ScooterPublishForm from "@/app/(private)/publish-ad/_components/vehicles/ScooterPublishForm/ScooterPublishForm";

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

  //get scooter
  const scooter = await scooterRepository.getByPublicId(id);
  if (!scooter) return notFound();
  const isOwner = await thisUserIsOwner(scooter.user.id);
  if (!isOwner) return notFound();

  return (
    <PublishAdVehiclesPageContainer>
      <Box mx="auto">
        <Heading mb="4" align="center">
          Редактирование объявления
        </Heading>
        <ScooterPublishForm scooter={scooter} formMode={FormMode.Edit} />
      </Box>
    </PublishAdVehiclesPageContainer>
  );
};

export default EditPublishAdVehiclesPage;
