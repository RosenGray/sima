import { notFound } from "next/navigation";

interface PersonalProfessionalsPageProps {
  params: {
    fullName: string;
  };
}

const PersonalProfessionalsPage = ({
  params,
}: PersonalProfessionalsPageProps) => {
  const { fullName } = params;
  // const shouldRender = false; // Replace with your actual condition
  // if (!shouldRender) {
  //   notFound();
  // }

  return <div>PersonalProfessionalsPage {fullName}</div>;
};

export default PersonalProfessionalsPage;
