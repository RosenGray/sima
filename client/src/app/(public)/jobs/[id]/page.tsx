import { FC } from "react";
import { jobRepository } from "@/lib/jobs/repository/JobRepository";
import { notFound } from "next/navigation";
import JobDetailClient from "../_components/JobDetailClient/JobDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_JOBS } from "@/lib/constants/entityTypes";

interface JobPageProps {
  params: Promise<{ id: string }>;
}

const JobPage: FC<JobPageProps> = async ({ params }) => {
  const { id } = await params;
  const job = await jobRepository.getByPublicId(id);
  if (!job) {
    notFound();
  }
  const isOwner = await thisUserIsOwner(job.user.id);
  const viewCount = isOwner
    ? await getAdViewCount(ENTITY_TYPE_JOBS, job.publicId)
    : null;
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_JOBS, job.publicId);
  }
  return <JobDetailClient job={job} viewCount={viewCount} />;
};

export default JobPage;
