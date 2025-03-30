// import { getQueryClient } from "@/app/get-query-client";
// import { getProfessionals } from "../../publish-ad/professionals/_lib/actions";
// import { DummyAllClient } from "./DummyAllClient/DummyAllClient";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";
import { User } from "@/types/auth/auth.types";
import { fetchClient } from "@/fetch/fetch.utils";
const ProfessionalsAllPage = async () => {
  // const queryClient = getQueryClient();
  // queryClient.fetchQuery({
  //   queryKey: ["getProfessionals"],
  //   queryFn: getProfessionals,
  //   staleTime: 1000 * 60 * 5, // 5 min
  // });
  const user = await fetchClient<{ currentUser: User }, { currentUser: null }>(
    "/api/auth/currentuser",
    {
      // cache: "force-cache",
    }
  );
  const { currentUser } = await user.json();
  return (
    <div>
      <nav>
        <Link href="/about">About</Link>
        <Link href="/professionals/all">Professionals</Link>
        <br />
        <Link href="/publish-ad/professionals">publish-ad/professionals</Link>
      </nav>

      <p>{currentUser?.hasPrivateProfessionalPage?.toString()}</p>
                  <br />
                  <Link href="/professionals/personal/vladislav-iokhim">
                    page
                  </Link>
                  <br />
                  <Link href="/about">About</Link>
      {/* <HydrationBoundary state={dehydrate(queryClient)}>
        <DummyAllClient />
      </HydrationBoundary> */}
    </div>
  );
};

export default ProfessionalsAllPage;
