import { FC } from "react";
import { accessoryRepository } from "@/lib/vehicles/accessories/repository/AccessoryRepository";
import { notFound } from "next/navigation";
import AccessoryDetailClient from "../_components/AccessoryDetailClient/AccessoryDetailClient";

interface AccessoryPageProps {
  params: Promise<{ id: string }>;
}

const AccessoryPage: FC<AccessoryPageProps> = async ({ params }) => {
  const { id } = await params;
  const accessory =
    await accessoryRepository.getByPublicId(id);
  if (!accessory) {
    return notFound();
  }
  return <AccessoryDetailClient accessory={accessory} />;
};

export default AccessoryPage;
