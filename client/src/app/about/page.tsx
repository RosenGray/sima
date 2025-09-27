import { FileUploadExample } from "@/components/FileUpload/FileUploadExample";
import { requireAuthOrRedirectTo } from "@/lib/auth/utils/auth.utils";


const AboutPage = async () => {
  // const user = await requireAuthOrRedirectTo();
  return <div>
    <FileUploadExample/>
  </div>;
};

export default AboutPage;