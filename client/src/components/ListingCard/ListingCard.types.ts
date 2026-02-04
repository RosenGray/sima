export interface ListingCardLikeButton {
  entityType: string;
  publicId: string;
}

export interface ListingCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  city: string;
  price?: string;
  likeButton?: ListingCardLikeButton;
}
