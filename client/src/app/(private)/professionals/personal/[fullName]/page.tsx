import { fetchClient } from "@/fetch/fetch.utils";
import { User } from "@/types/auth/auth.types";
import { redirect } from "next/navigation";

interface PersonalProfessionalsPageProps {
  params: {
    fullName: string;
  };
}

const PersonalProfessionalsPage = async ({
  params,
}: PersonalProfessionalsPageProps) => {
  const user = await fetchClient<{ currentUser: User }, { currentUser: null }>(
    "/api/auth/currentuser"
  );
  const { currentUser } = await user.json();
  if (!currentUser) {
    redirect("/login");
  }

  const { hasPrivateProfessionalPage, lastName } = currentUser;
  if (!hasPrivateProfessionalPage) {
    return <div>You dont have a private professional page</div>;
  }

  return <div>lets do that things,{lastName}</div>;
  // const shouldRender = false; // Replace with your actual condition
  // if (!shouldRender) {
  //   notFound();
  // }
};

export default PersonalProfessionalsPage;
