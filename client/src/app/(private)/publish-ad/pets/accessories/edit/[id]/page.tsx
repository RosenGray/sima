import { Box, Heading } from "@radix-ui/themes";
import { FC } from "react";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { PublishAdPetsPageContainer } from "../../create/page.styles";
import { petAccessoryRepository } from "@/lib/pets/accessories/repository/PetAccessoryRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import PetAccessoryPublishForm from "@/app/(private)/publish-ad/_components/pets/PetAccessoryPublishForm/PetAccessoryPublishForm";

interface EditPetAccessoryPageProps {
  params: Promise<{ id: string }>;
}

const EditPetAccessoryPage: FC<EditPetAccessoryPageProps> = async ({
  params,
}) => {
  const { id } = await params;

  // Get accessory
  const accessory = await petAccessoryRepository.getByPublicId(id);
  if (!accessory) return notFound();
  const isOwner = await thisUserIsOwner(accessory.user.id);
  if (!isOwner) return notFound();

  return (
    <PublishAdPetsPageContainer>
      <Box mx="auto">
        <Heading mb="4" align="center">
          Редактирование объявления
        </Heading>
        <PetAccessoryPublishForm entity={accessory} formMode={FormMode.Edit} />
      </Box>
    </PublishAdPetsPageContainer>
  );
};

export default EditPetAccessoryPage;
