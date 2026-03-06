import { SerializedUser } from "@/lib/auth/types/auth.scema";
import { EntityType } from "@/lib/constants/entityTypes";

/** Ad status at snapshot time (matches entity status: active | expired | archived | deleted | pending). */
export const AD_SNAPSHOT_STATUSES = [
  "active",
  "expired",
  "archived",
  "deleted",
  "pending",
] as const;

export type AdSnapshotStatus = (typeof AD_SNAPSHOT_STATUSES)[number];

export interface AdSnapshot {
  entityType: EntityType;
  entityPublicId: string;
  title: string;
  thumbnailUrl: string;
  price?: number;
  adLink: string;
  adRemoved: boolean;
  /** Status of the ad when the conversation was created (always present in API; normalized from DB). */
  status: AdSnapshotStatus;
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
