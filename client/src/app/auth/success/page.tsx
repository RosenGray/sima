import { redirect } from "next/navigation";

const SuccessPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return redirect("/");
};

export default SuccessPage;
