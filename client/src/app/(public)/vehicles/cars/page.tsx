import { FC } from "react";
import { CarsPageContainer } from "./page.styles";

interface CarsPageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

const CarsPage: FC<CarsPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <CarsPageContainer>
      {/* Cars content will go here */}
      hello
    </CarsPageContainer>
  );
};

export default CarsPage;