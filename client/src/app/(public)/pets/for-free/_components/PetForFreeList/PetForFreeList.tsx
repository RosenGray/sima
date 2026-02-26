"use client";
import React from "react";
import { Flex, Link } from "@radix-ui/themes";
import PetForFreeListItem from "./PetForFreeListItem";
import { SerializedPetForFree } from "@/lib/pets/for-free/types/petForFree.types";

interface PetForFreeListProps {
  pets: SerializedPetForFree[];
}

export const PetForFreeList: React.FC<PetForFreeListProps> = ({ pets }) => {
  return (
    <Flex direction="column" gap="3" width="100%">
      {pets.map((pet) => (
        <Link href={`/pets/for-free/${pet.publicId}`} key={pet.publicId}>
          <PetForFreeListItem pet={pet} />
        </Link>
      ))}
    </Flex>
  );
};
