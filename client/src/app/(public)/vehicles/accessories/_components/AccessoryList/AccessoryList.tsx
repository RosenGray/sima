"use client";
import React from "react";
import { Flex, Link } from "@radix-ui/themes";
import AccessoryListItem from "./AccessoryListItem";
import { SerializedAccessory } from "@/lib/vehicles/accessories/types/accessory.types";

interface AccessoryListProps {
  accessories: SerializedAccessory[];
}

export const AccessoryList: React.FC<AccessoryListProps> = ({
  accessories,
}) => {
  return (
    <Flex direction="column" gap="3" width="100%">
      {accessories.map((accessory) => (
        <Link
          href={`/vehicles/accessories/${accessory.publicId}`}
          key={accessory.publicId}
        >
          <AccessoryListItem accessory={accessory} />
        </Link>
      ))}
    </Flex>
  );
};
