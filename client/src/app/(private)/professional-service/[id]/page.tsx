import { FC } from "react";

interface ProfessionalServicePageProps {
  params: Promise<{ id: string }>;
}

const ProfessionalServicePage: FC<ProfessionalServicePageProps> = async ({
  params,
}) => {
  const { id } = await params;

  return <h1>Professional Service Page {id}</h1>;
};

export default ProfessionalServicePage;
