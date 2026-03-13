import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";

interface AdViewCountProps {
  count: number;
}

function pluralizeViews(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) return `${count} просмотров`;
  if (mod10 === 1) return `${count} просмотр`;
  if (mod10 >= 2 && mod10 <= 4) return `${count} просмотра`;
  return `${count} просмотров`;
}

const AdViewCount: React.FC<AdViewCountProps> = ({ count }) => {
  return (
    <Flex align="center" gap="1">
      <EyeOpenIcon width={16} height={16} />
      <Text size="2">{pluralizeViews(count)}</Text>
    </Flex>
  );
};

export default AdViewCount;
