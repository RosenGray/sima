import { Box, Heading, Card } from "@radix-ui/themes";
import { FC } from "react";
import { FormModeSchema } from "@/components/Form/types/form.types";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { PublishAdVehiclesPageContainer } from "../page.styles";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import CarPublishForm from "@/app/(private)/publish-ad/_components/vehicles/CarPublishForm/CarPublishForm";

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

  //get car
  const car = await carRepository.getByPublicId(id);
  if (!car) return notFound();
  const isOwner = await thisUserIsOwner(car.user.id);
  if (!isOwner) return notFound();

  return (
    <PublishAdVehiclesPageContainer>
      <Box maxWidth="80%" mx="auto">
        <Heading mb="4" align="center">
          Редактирование объявления
        </Heading>
        <Card>
          <CarPublishForm car={car} formMode={FormMode.Edit} />
        </Card>
      </Box>
    </PublishAdVehiclesPageContainer>
  );
};

export default EditPublishAdVehiclesPage;
