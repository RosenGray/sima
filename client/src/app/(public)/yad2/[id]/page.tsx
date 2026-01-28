import { FC } from "react";
import { yad2ItemRepository } from "@/lib/yad2/repository/Yad2ItemRepository";
import { notFound } from "next/navigation";
import Yad2ItemDetailClient from "../_components/Yad2ItemDetailClient/Yad2ItemDetailClient";

interface Yad2ItemPageProps {
  params: Promise<{ id: string }>;
}

const Yad2ItemPage: FC<Yad2ItemPageProps> = async ({ params }) => {
  const { id } = await params;
  const yad2Item = await yad2ItemRepository.getByPublicId(id);
  if (!yad2Item) {
    notFound();
  }
  return <Yad2ItemDetailClient yad2Item={yad2Item} />;
};

export default Yad2ItemPage;
