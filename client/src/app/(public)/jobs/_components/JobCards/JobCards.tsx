import { Link } from "@radix-ui/themes";
import { SerializedJob } from "@/lib/jobs/types/job.types";
import JobCard from "./JobCard";

interface JobCardsProps {
  jobs: SerializedJob[];
}

const JobCards: React.FC<JobCardsProps> = ({ jobs }) => {
  return (
    <>
      {jobs.map((job) => (
        <Link href={`/jobs/${job.publicId}`} key={job.publicId}>
          <JobCard job={job} />
        </Link>
      ))}
    </>
  );
};

export default JobCards;
