import { requireAuthOrRedirectTo } from "@/lib/auth/utils/auth.utils";


const AboutPage = async () => {
  const user = await requireAuthOrRedirectTo();
  return <div>AboutPage</div>;
};

export default AboutPage;