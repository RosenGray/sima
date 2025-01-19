import { redirect } from "next/navigation";


const SuccessPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return redirect("/");
};

export default SuccessPage;
