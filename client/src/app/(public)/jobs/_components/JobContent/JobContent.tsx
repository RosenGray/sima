import { FC } from "react";
import { jobRepository, JobSearchFilters } from "@/lib/jobs/repository/JobRepository";
import JobCards from "../JobCards/JobCards";
import Pagination from "@/components/Pagination/Pagination";
import { JobGrid, StickyPaginationWrapper, Title } from "../../page.styles";
import { Text } from "@radix-ui/themes";

interface JobContentProps {
  filters: JobSearchFilters;
  currentPage: number;
}

const JobContent: FC<JobContentProps> = async ({ filters, currentPage }) => {
  const jobs = await jobRepository.getAll(filters, currentPage, 10);

  return (
    <>
      <Title size="5">Вакансии</Title>

      <Text as="p" size="2" color="gray">
        {jobs.totalCount} результатов найдено
      </Text>

      <JobGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <JobCards jobs={jobs.data} />
      </JobGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={jobs.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default JobContent;
