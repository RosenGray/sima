import { FC } from "react";
import { jobRepository } from "@/lib/jobs/repository/JobRepository";
import { notFound } from "next/navigation";
import JobDetailClient from "../_components/JobDetailClient/JobDetailClient";

interface JobPageProps {
  params: Promise<{ id: string }>;
}

const JobPage: FC<JobPageProps> = async ({ params }) => {
  const { id } = await params;
  const job = await jobRepository.getByPublicId(id);
  if (!job) {
    notFound();
  }
  return <JobDetailClient job={job} />;
};

export default JobPage;
