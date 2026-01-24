import { Box, Heading } from "@radix-ui/themes";
import { FC } from "react";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { PublishAdPetsPageContainer } from "../../create/page.styles";
import { petForFreeRepository } from "@/lib/pets/for-free/repository/PetForFreeRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import PetForFreePublishForm from "@/app/(private)/publish-ad/_components/pets/PetForFreePublishForm/PetForFreePublishForm";

interface EditPetForFreePageProps {
  params: Promise<{ id: string }>;
}

const EditPetForFreePage: FC<EditPetForFreePageProps> = async ({ params }) => {
  const { id } = await params;

  const pet = await petForFreeRepository.getByPublicId(id);
  if (!pet) return notFound();
  const isOwner = await thisUserIsOwner(pet.user.id);
  if (!isOwner) return notFound();

  return (
    <PublishAdPetsPageContainer>
      <Box mx="auto">
        <Heading mb="4" align="center">
          Редактирование объявления
        </Heading>
        <PetForFreePublishForm pet={pet} formMode={FormMode.Edit} />
      </Box>
    </PublishAdPetsPageContainer>
  );
};

export default EditPetForFreePage;
