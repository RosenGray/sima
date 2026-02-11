export interface ListingCardLikeButton {
  entityType: string;
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
  likeButton?: ListingCardLikeButton;
}
