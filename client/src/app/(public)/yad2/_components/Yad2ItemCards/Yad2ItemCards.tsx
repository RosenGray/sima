import React from "react";
import { Link } from "@radix-ui/themes";
import Yad2ItemCard from "./Yad2ItemCard";
import { SerializedYad2Item } from "@/lib/yad2/types/yad2.types";

interface Yad2ItemCardsProps {
  yad2Items: SerializedYad2Item[];
}

export const Yad2ItemCards: React.FC<Yad2ItemCardsProps> = ({ yad2Items }) => {
  return (
    <>
      {yad2Items.map((yad2Item) => (
        <Link
          href={`/yad2/${yad2Item.publicId}`}
          key={yad2Item.publicId}
        >
          <Yad2ItemCard yad2Item={yad2Item} />
        </Link>
      ))}
    </>
  );
};
