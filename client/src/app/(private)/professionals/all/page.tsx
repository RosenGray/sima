import { getQueryClient } from "@/app/get-query-client";
import { getProfessionals } from "../../publish-ad/professionals/_lib/actions";
import { DummyAllClient } from "./DummyAllClient/DummyAllClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";
const ProfessionalsAllPage = () => {
  const queryClient = getQueryClient();
  queryClient.fetchQuery({
    queryKey: ["getProfessionals"],
    queryFn: getProfessionals,
    staleTime: 1000 * 60 * 5, // 5 min
  });

  return (
    <div>
      <nav>
        <Link href="/about">About</Link>
        <Link href="/professionals/all">Professionals</Link>
        <br />
        <Link href="/publish-ad/professionals">publish-ad/professionals</Link>
      </nav>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DummyAllClient />
      </HydrationBoundary>
    </div>
  );
};

export default ProfessionalsAllPage;
