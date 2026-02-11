import { EntityType } from "@/lib/constants/entityTypes";

export interface ListingCardLikeButton {
  entityType: EntityType;
  publicId: string;
}

export interface ListingCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  description?: string;
  city: string;
  district: string;
  price?: string;
  likeButton: ListingCardLikeButton;
}
