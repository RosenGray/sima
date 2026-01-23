import { Box, Heading } from "@radix-ui/themes";
import { FC } from "react";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { PublishAdPetsPageContainer } from "../../create/page.styles";
import { petForSaleRepository } from "@/lib/pets/for-sale/repository/PetForSaleRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import PetForSalePublishForm from "@/app/(private)/publish-ad/_components/pets/PetForSalePublishForm/PetForSalePublishForm";

interface EditPetForSalePageProps {
  params: Promise<{ id: string }>;
}

const EditPetForSalePage: FC<EditPetForSalePageProps> = async ({ params }) => {
  const { id } = await params;

  // Get pet
  const pet = await petForSaleRepository.getByPublicId(id);
  if (!pet) return notFound();
  const isOwner = await thisUserIsOwner(pet.user.id);
  if (!isOwner) return notFound();

  return (
    <PublishAdPetsPageContainer>
      <Box mx="auto">
        <Heading mb="4" align="center">
          Редактирование объявления
        </Heading>
        <PetForSalePublishForm pet={pet} formMode={FormMode.Edit} />
      </Box>
    </PublishAdPetsPageContainer>
  );
};

export default EditPetForSalePage;
