import { FC } from "react";
import { jobRepository, JobSearchFilters } from "@/lib/jobs/repository/JobRepository";
import JobCards from "../JobCards/JobCards";
import Pagination from "@/components/Pagination/Pagination";
import { JobGrid, StickyPaginationWrapper } from "../../page.styles";
import { SortOption } from "@/components/SortFilters/SortFilters";
import JobsHeaderClient from "../JobsHeaderClient/JobsHeaderClient";

interface JobContentProps {
  filters: JobSearchFilters;
  currentPage: number;
  sort?: string;
}

const jobSortOptions: SortOption[] = [
  {
    field: "date",
    label: "Дата",
    ascLabel: "Дата (старые → новые)",
    descLabel: "Дата (новые → старые)",
  },
];

const JobContent: FC<JobContentProps> = async ({ filters, currentPage, sort }) => {
  const jobs = await jobRepository.getAll(filters, currentPage, 10, sort);
console.log(jobs);
  return (
    <>
      <JobsHeaderClient
        totalCount={jobs.totalCount}
        initialSort={sort}
        sortOptions={jobSortOptions}
      />

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
