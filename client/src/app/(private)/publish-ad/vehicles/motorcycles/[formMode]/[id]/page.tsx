import { Box, Heading } from "@radix-ui/themes";
import { FC } from "react";
import { FormModeSchema } from "@/components/Form/types/form.types";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { PublishAdVehiclesPageContainer } from "../page.styles";
import { motorcycleRepository } from "@/lib/vehicles/motorcycles/repository/MotorcycleRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import MotorcyclePublishForm from "@/app/(private)/publish-ad/_components/vehicles/MotorcyclePublishForm/MotorcyclePublishForm";

interface EditPublishAdMotorcyclesPageProps {
  params: Promise<{ formMode: string; id: string }>;
}

const EditPublishAdMotorcyclesPage: FC<EditPublishAdMotorcyclesPageProps> =
  async ({ params }) => {
    const { formMode, id } = await params;
    const isCreateMode = formMode === FormMode.Create;

    //validate with schema
    const validatedParams = FormModeSchema.safeParse(formMode);
    if (!validatedParams.success || isCreateMode) return notFound();

    //get motorcycle
    const motorcycle = await motorcycleRepository.getByPublicId(id);
    if (!motorcycle) return notFound();
    const isOwner = await thisUserIsOwner(motorcycle.user.id);
    if (!isOwner) return notFound();

    return (
      <PublishAdVehiclesPageContainer>
        <Box mx="auto">
          <Heading mb="4" align="center">
            Редактирование объявления
          </Heading>
          <MotorcyclePublishForm
            motorcycle={motorcycle}
            formMode={FormMode.Edit}
          />
        </Box>
      </PublishAdVehiclesPageContainer>
    );
  };

export default EditPublishAdMotorcyclesPage;
