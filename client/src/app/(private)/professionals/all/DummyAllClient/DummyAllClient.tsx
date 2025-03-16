"use client";

import { getProfessionals } from "@/app/(private)/publish-ad/professionals/_lib/actions";
import { Button } from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const DummyAllClient = () => {
  // const queryClient = useQueryClient();
  // const searchParams = useSearchParams();
  // const isNewProfessional = searchParams.get("new") === "true";
  const { data, isLoading } = useQuery({
    queryKey: ["getProfessionals"],
    queryFn: () => getProfessionals(),
    staleTime: 1000 * 60 * 5, // 5 min
  });

  // console.log({ data, isLoading });

  // useEffect(() => {
  //   if (isNewProfessional) {
  //     console.log("isNewProfessional", isNewProfessional);
  //     // Force refetch the data
  //     queryClient.invalidateQueries({ queryKey: ["getProfessionals"] });
  //   }
  // }, [isNewProfessional, queryClient]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 style={{ color: "red" }}>DummyAllClient</h1>
      {/* <Button
        onClick={() =>
          queryClient.invalidateQueries({ queryKey: ["getProfessionals"] })
        }
      >
        Invalidate
      </Button> */}
      <div>
        {data?.map((professional, index) => (
          <div key={professional.id}>
            <span style={{ color: "red" }}>{index + 1}</span>
            <br />
            {professional.id}
          </div>
        )) || <div>No data</div>}
      </div>
    </div>
  );
};
