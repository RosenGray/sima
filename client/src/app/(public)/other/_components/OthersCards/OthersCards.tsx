import { Link } from "@radix-ui/themes";
import { SerializedOthers } from "@/lib/other/types/others.types";
import OthersCard from "./OthersCard";

interface OthersCardsProps {
  others: SerializedOthers[];
}

const OthersCards: React.FC<OthersCardsProps> = ({ others }) => {
  return (
    <>
      {others.map((other) => (
        <Link href={`/other/${other.publicId}`} key={other.publicId}>
          <OthersCard others={other} />
        </Link>
      ))}
    </>
  );
};

export default OthersCards;
