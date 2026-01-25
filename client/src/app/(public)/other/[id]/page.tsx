import { FC } from "react";
import { othersRepository } from "@/lib/other/repository/OthersRepository";
import { notFound } from "next/navigation";
import OthersDetailClient from "../_components/OthersDetailClient/OthersDetailClient";

interface OtherPageProps {
  params: Promise<{ id: string }>;
}

const OtherPage: FC<OtherPageProps> = async ({ params }) => {
  const { id } = await params;
  const others = await othersRepository.getByPublicId(id);
  if (!others) {
    notFound();
  }
  return <OthersDetailClient others={others} />;
};

export default OtherPage;
