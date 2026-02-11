import { SerializedUser } from "@/lib/auth/types/auth.scema";
import { EntityType } from "@/lib/constants/entityTypes";

export interface AdSnapshot {
  entityType: EntityType;
  entityPublicId: string;
  title: string;
  thumbnailUrl: string;
  price?: number;
  adLink: string;
  adRemoved: boolean;
}

export interface SerializedConversationListItem {
  publicId: string;
  otherParticipant: SerializedUser;
  adSnapshot: AdSnapshot;
  lastMessageSnippet?: string;
  lastMessageAt?: string;
}

export interface SerializedMessage {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: string;
}

export interface SerializedConversationWithMessages {
  publicId: string;
  otherParticipant: SerializedUser;
  adSnapshot: AdSnapshot;
  messages: SerializedMessage[];
}
