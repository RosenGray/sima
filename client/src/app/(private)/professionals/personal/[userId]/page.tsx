import { notFound } from "next/navigation";

interface PersonalProfessionalsPageProps {
  params: {
    userId: string;
  };
}

const PersonalProfessionalsPage = ({
  params,
}: PersonalProfessionalsPageProps) => {
  const { userId } = params;
  const shouldRender = false; // Replace with your actual condition
  if (!shouldRender) {
    notFound();
  }
  
  return <div>PersonalProfessionalsPage {userId}</div>;
};

export default PersonalProfessionalsPage;
