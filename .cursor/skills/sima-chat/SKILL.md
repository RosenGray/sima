# Chat System Implementation Skill

## Overview

This skill provides a comprehensive guide for implementing a chat/messaging system in the SIMA application. The chat system allows users to communicate about specific ads (pets, vehicles, etc.) with conversation threading, ad snapshots, and real-time-like updates via polling.

## When to Use This Skill

Use this skill when you need to:
- Add chat functionality to a new entity type (vehicles, jobs, real estate, etc.)
- Implement messaging between buyers and sellers
- Create conversation threads tied to specific ads
- Display chat UI with conversation list and active chat
- Handle message sending, receiving, and deletion
- Track user activity (last seen)

## Architecture Overview

The chat system consists of:

### Backend Components

1. **MongoDB Models**:
   - `Conversation`: Stores chat conversations between users about specific ads
   - `Message`: Stores individual messages within conversations

2. **Repository Layer**:
   - `ChatRepository`: Handles all database operations for conversations and messages

3. **Server Actions**:
   - `getOrCreateChat`: Creates or retrieves a conversation for an ad
   - `getChatList`: Retrieves all conversations for the current user
   - `getChatWithMessages`: Retrieves a specific conversation with messages
   - `sendMessage`: Sends a message in a conversation
   - `deleteChat`: Deletes a conversation for the current user

### Frontend Components

1. **Pages**:
   - `/chat` - Main chat page (conversation list only)
   - `/chat/[chatId]` - Chat page with active conversation

2. **Client Components**:
   - `ChatClient`: Main chat layout with list and active chat panels
   - `ChatList`: Displays list of conversations
   - `ChatListItem`: Individual conversation item
   - `ActiveChat`: Active conversation view with messages and input
   - `EmptyStateNoMessages`: Empty state when no messages exist

### Data Flow

```mermaid
graph TB
    DetailPage[Ad Detail Page] -->|Contact Seller| GetOrCreate[getOrCreateChat]
    GetOrCreate --> ChatRepo[ChatRepository]
    ChatRepo --> MongoDB[(MongoDB)]
    
    GetOrCreate -->|Redirect| ChatPage[/chat/chatId]
    ChatPage -->|Load| GetChat[getChatWithMessages]
    GetChat --> ChatRepo
    
    ActiveChat -->|Send Message| SendMsg[sendMessage]
    SendMsg --> ChatRepo
    
    ChatClient -->|Poll every 30s| GetChat
    
    ChatClient -->|Delete| DeleteChat[deleteChat]
    DeleteChat --> ChatRepo
```

## Database Schema

### Conversation Model

```typescript
interface IConversation {
  id: string;
  publicId: string; // nanoid(10)
  participants: mongoose.Types.ObjectId[]; // Array of 2 user IDs
  adSnapshot: IAdSnapshot; // Snapshot of the ad at conversation creation
  deletedByUserIds: mongoose.Types.ObjectId[]; // Users who deleted this chat
  createdAt?: Date;
  updatedAt?: Date;
}

interface IAdSnapshot {
  entityType: string; // e.g., "pets-for-sale", "cars", "jobs"
  entityPublicId: string; // Public ID of the ad
  title: string; // Display title
  thumbnailUrl: string; // Ad thumbnail image
  price?: number; // Ad price (optional)
  adLink: string; // Link to the ad detail page
  adRemoved: boolean; // Whether the ad has been deleted
}
```

**Indexes**:
- `publicId`: unique index
- `participants`: index
- `deletedByUserIds`: index
- `{ participants: 1, "adSnapshot.entityType": 1, "adSnapshot.entityPublicId": 1 }`: unique compound index (prevents duplicate conversations)

### Message Model

```typescript
interface IMessage {
  id: string;
  conversation: mongoose.Types.ObjectId; // Reference to Conversation
  sender: mongoose.Types.ObjectId; // Reference to User
  body: string; // Message text
  createdAt?: Date;
}
```

**Indexes**:
- `conversation`: index
- `sender`: index
- `{ conversation: 1, createdAt: 1 }`: compound index for efficient message retrieval

## Implementation Steps

### Step 1: Add Entity Type Constant

Define a constant for your entity type in `getOrCreateChat` action or a shared constants file:

```typescript
// In lib/chat/actions/getOrCreateChat.ts or shared constants
const ENTITY_TYPE_CARS = "cars";
const ENTITY_TYPE_JOBS = "jobs";
const ENTITY_TYPE_REAL_ESTATE = "real-estate";
```

### Step 2: Add Contact Seller Button to Detail Page

In your entity detail page (e.g., `CarDetailClient.tsx`):

1. **Add State**:
```typescript
const [chatLoading, setChatLoading] = useState(false);
const [chatError, setChatError] = useState<string | null>(null);
```

2. **Add Handler**:
```typescript
const handleContactSeller = async () => {
  if (chatLoading || !isAuthenticated || isOwner) return;
  setChatLoading(true);
  setChatError(null);
  const result = await getOrCreateChat("entity-type", entity.publicId);
  
  if (result.success && result.chatId) {
    router.push(`/chat/${result.chatId}`);
  } else if (!result.success && result.error) {
    setChatError(result.error);
    setChatLoading(false);
    setErrorModalOpen(true);
  }
};
```

3. **Add Button in Contact Section**:
```typescript
<ContactSection>
  {/* ... other contact info ... */}
  
  {isAuthenticated && !isOwner && (
    <Button
      size="3"
      onClick={handleContactSeller}
      disabled={chatLoading}
      style={{ width: "100%" }}
    >
      {chatLoading ? <Spinner /> : "Написать продавцу"}
    </Button>
  )}
  
  {!isAuthenticated && (
    <Text size="2" color="gray">
      Войдите, чтобы написать продавцу
    </Text>
  )}
</ContactSection>
```

### Step 3: Update getOrCreateChat Server Action

Add support for your entity type in `lib/chat/actions/getOrCreateChat.ts`:

```typescript
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";

const ENTITY_TYPE_CARS = "cars";

export async function getOrCreateChat(
  adEntityType: string,
  adPublicId: string
): Promise<GetOrCreateChatResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Войдите в аккаунт" };
  }

  // Add validation for your entity type
  if (![ENTITY_TYPE_PETS_FOR_SALE, ENTITY_TYPE_CARS].includes(adEntityType)) {
    return { success: false, error: "Этот тип объявления не поддерживается" };
  }

  // Fetch entity based on type
  let entity: any;
  let adOwnerId: string;
  
  if (adEntityType === ENTITY_TYPE_CARS) {
    entity = await carRepository.getByPublicId(adPublicId);
  } else if (adEntityType === ENTITY_TYPE_PETS_FOR_SALE) {
    entity = await petForSaleRepository.getByPublicId(adPublicId);
  }
  
  if (!entity) {
    return { success: false, error: "Объявление не найдено" };
  }

  adOwnerId = typeof entity.user === "object" ? entity.user.id : entity.user;
  if (adOwnerId === user.id) {
    return { success: false, error: "Нельзя начать чат с самим собой" };
  }

  // Create ad snapshot based on entity type
  const thumbnailUrl = entity.images?.[0]?.url ?? "";
  let title: string;
  
  if (adEntityType === ENTITY_TYPE_CARS) {
    title = [entity.manufacturer, entity.model, entity.city].filter(Boolean).join(" • ");
  } else {
    title = [entity.animal, entity.kind, entity.city].filter(Boolean).join(" • ");
  }
  
  const adLink = `/${adEntityType.replace("-", "/")}/${entity.publicId}`;

  const adSnapshot = {
    entityType: adEntityType,
    entityPublicId: entity.publicId,
    title,
    thumbnailUrl,
    price: entity.price,
    adLink,
    adRemoved: false,
  };

  try {
    const { publicId } = await chatRepository.getOrCreateConversation(
      user.id,
      adOwnerId,
      adEntityType,
      adPublicId,
      adSnapshot
    );
    return { success: true, chatId: publicId };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Не удалось создать чат";
    return { success: false, error: message };
  }
}
```

### Step 4: Update User Model (if not already done)

Add `lastSeenAt` field to track user activity:

```typescript
// In lib/auth/models/User.ts
interface IUser {
  // ... other fields
  lastSeenAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  // ... other fields
  lastSeenAt: {
    type: Date,
    required: false,
  },
});
```

### Step 5: Update Auth Utils (if not already done)

Update `getCurrentUser` to track last seen with throttling:

```typescript
export async function getCurrentUser(): Promise<SerializedUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SIMA_AUTH_SESSION_CONFIG.name)?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_KEY!) as { email: string };
    if (!decoded) return null;

    await connectDB();

    const now = new Date();
    const throttleMs = 5 * 60 * 1000; // 5 minutes

    type LeanUser = { _id: unknown; lastSeenAt?: Date | string; [k: string]: unknown };
    const found = (await User.findOne({ email: decoded.email }).lean()) as LeanUser | null;
    if (!found) return null;

    const lastSeenAt = found.lastSeenAt ? new Date(found.lastSeenAt) : null;
    const lastSeenAtMs = lastSeenAt ? lastSeenAt.getTime() : 0;
    const shouldUpdate = !lastSeenAt || now.getTime() - lastSeenAtMs > throttleMs;

    if (shouldUpdate) {
      await User.updateOne(
        { email: decoded.email },
        { $set: { lastSeenAt: now } }
      );
    }

    // ... rest of serialization
  } catch (error) {
    return null;
  }
}
```

### Step 6: Update Middleware (if not already done)

Add `/chat` to protected routes:

```typescript
// In middleware.ts
const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/settings",
  "/admin",
  "/api/protected",
  "/publish-ad",
  "/chat", // Add this
];
```

## UI Components

### ChatClient Component Pattern

The main chat layout component handles:
- Split-pane layout (chat list + active chat)
- Responsive mobile view (toggle between list and chat)
- Polling for new messages (30-second interval)
- State management for chat list and messages

**Key Features**:
- Desktop: Shows list and active chat side-by-side
- Mobile: Shows list OR active chat with back button
- Polling: Fetches messages every 30 seconds when chat is active
- State: Manages chat list, selected chat, and messages

```typescript
const POLL_INTERVAL_MS = 30_000;

const ChatClient: React.FC<ChatClientProps> = ({
  initialChatList,
  initialSelectedChat,
  initialMessages,
  selectedChatId,
  currentUserId,
}) => {
  const [chatList, setChatList] = useState(initialChatList);
  const [selectedChat, setSelectedChat] = useState(initialSelectedChat);
  const [messages, setMessages] = useState(initialMessages ?? []);

  const refreshChat = useCallback(async (chatId: string) => {
    const result = await getChatWithMessages(chatId);
    if (result.success && result.chat) {
      setSelectedChat(result.chat);
      setMessages(result.chat.messages);
    }
  }, []);

  useEffect(() => {
    if (!selectedChatId) return;
    const interval = setInterval(() => {
      refreshChat(selectedChatId);
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [selectedChatId, refreshChat]);

  return (
    <ChatPageContainer>
      <ChatLayoutCard>
        <ChatListPanel $hideOnMobile={!!selectedChatId}>
          <ChatList list={chatList} activeChatId={selectedChatId} />
        </ChatListPanel>

        <ActiveChatPanel $hideOnMobile={!selectedChatId}>
          {selectedChat ? (
            <>
              <ChatBackBar align="center" gap="2">
                <Button size="1" variant="ghost" asChild>
                  <Link href="/chat">
                    <ArrowLeftIcon />
                    К списку чатов
                  </Link>
                </Button>
              </ChatBackBar>
              <ActiveChat
                chat={{ ...selectedChat, messages }}
                currentUserId={currentUserId}
                onMessagesUpdate={handleMessagesUpdate}
              />
            </>
          ) : (
            <PlaceholderPanel>
              <p>Выберите чат</p>
            </PlaceholderPanel>
          )}
        </ActiveChatPanel>
      </ChatLayoutCard>
    </ChatPageContainer>
  );
};
```

### ActiveChat Component Pattern

Handles the active conversation view:
- Header with participant name and last seen
- Context menu for actions (delete)
- Ad snapshot sub-header
- Message list with bubbles
- Message input with send button

**Key Features**:
- Message bubbles: Different styling for own vs other messages
- Enter key: Send message on Enter (without Shift)
- Context menu: Delete chat option
- Ad snapshot: Shows ad details with link (if not removed)
- Empty state: Shows when no messages exist

```typescript
const ActiveChat: React.FC<ActiveChatProps> = ({
  chat,
  currentUserId,
  onMessagesUpdate,
}) => {
  const [messages, setMessages] = useState<SerializedMessage[]>(chat.messages);
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = useCallback(async () => {
    const body = inputValue.trim();
    if (!body || sending) return;
    setSending(true);
    const result = await sendMessage(chat.publicId, body);
    setSending(false);
    if (result.success && result.message) {
      setMessages((prev) => [...prev, result.message!]);
      setInputValue("");
      onMessagesUpdate?.([...messages, result.message]);
    }
  }, [chat.publicId, inputValue, sending, messages, onMessagesUpdate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <>
      <ActiveChatHeader>
        {/* User info and context menu */}
      </ActiveChatHeader>

      <AdSubHeader>
        {/* Ad snapshot with thumbnail, title, price, link */}
      </AdSubHeader>

      <ChatBody>
        {messages.length === 0 ? (
          <EmptyStateNoMessages />
        ) : (
          <MessageList>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} $isOwn={msg.senderId === currentUserId}>
                <Text size="2">{msg.body}</Text>
              </MessageBubble>
            ))}
          </MessageList>
        )}
      </ChatBody>

      <InputStripe>
        <TextField.Root
          placeholder="Написать сообщение"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={sending}
        />
        <Button onClick={handleSend} disabled={sending || !inputValue.trim()}>
          Отправить
        </Button>
      </InputStripe>
    </>
  );
};
```

## Styling Patterns

### ChatClient Styles

```typescript
export const ChatLayoutCard = styled(Card)`
  display: flex;
  flex-direction: row;
  min-height: 600px;
  overflow: hidden;

  @media (max-width: ${breakpoints.md - 1}px) {
    flex-direction: column;
    min-height: 500px;
  }
`;

export const ChatListPanel = styled(Box)<{ $hideOnMobile: boolean }>`
  width: 100%;
  max-width: 360px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--gray-6);

  @media (max-width: ${breakpoints.md - 1}px) {
    max-width: none;
    display: ${({ $hideOnMobile }) => ($hideOnMobile ? "none" : "flex")};
    border-right: none;
    border-bottom: 1px solid var(--gray-6);
  }
`;

export const ActiveChatPanel = styled(Box)<{ $hideOnMobile: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: ${breakpoints.md - 1}px) {
    display: ${({ $hideOnMobile }) => ($hideOnMobile ? "none" : "flex")};
  }
`;
```

### ActiveChat Styles

```typescript
export const MessageBubble = styled(Box)<{ $isOwn: boolean }>`
  max-width: 75%;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-3);
  align-self: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
  background: ${({ $isOwn }) => ($isOwn ? "var(--accent-9)" : "var(--gray-4)")};
  color: ${({ $isOwn }) => ($isOwn ? "white" : "var(--gray-12)")};
`;

export const InputStripe = styled(Flex)`
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--gray-6);
  flex-shrink: 0;
  align-items: center;
  gap: var(--space-3);
`;
```

## Repository Methods

### getOrCreateConversation

Creates or retrieves a conversation between two users for a specific ad:

```typescript
async getOrCreateConversation(
  userId: string,
  adOwnerId: string,
  adEntityType: string,
  adPublicId: string,
  adSnapshot: IAdSnapshot
): Promise<{ publicId: string }> {
  await connectDB();

  // Prevent self-chat
  if (userId === adOwnerId) {
    throw new Error("Cannot create chat with yourself");
  }

  // Sort participant IDs for consistent ordering
  const [p0, p1] = sortParticipantIds(userId, adOwnerId);
  const participantIds = [toObjectId(p0), toObjectId(p1)];

  // Find existing conversation (prevents duplicates)
  let conv = await Conversation.findOne({
    participants: { $all: participantIds },
    "adSnapshot.entityType": sanitize(adEntityType),
    "adSnapshot.entityPublicId": sanitize(adPublicId),
  });

  if (!conv) {
    conv = await Conversation.create({
      publicId: nanoid(10),
      participants: participantIds,
      adSnapshot,
      deletedByUserIds: [],
    });
  }

  return { publicId: conv.publicId };
}
```

### getConversationsByUserId

Retrieves all conversations for a user with last message snippet:

```typescript
async getConversationsByUserId(
  userId: string
): Promise<SerializedConversationListItem[]> {
  const conversations = await Conversation.find({
    participants: toObjectId(userId),
    deletedByUserIds: { $ne: toObjectId(userId) },
  }).sort({ updatedAt: -1 });

  const list: SerializedConversationListItem[] = [];

  for (const c of conversations) {
    const otherId = c.participants.find((p) => p.toString() !== userId);
    const [lastMessage] = await Message.find({ conversation: c._id })
      .sort({ createdAt: -1 })
      .limit(1);
    
    const user = await User.findById(otherId);
    
    list.push({
      publicId: c.publicId,
      otherParticipant: serializedUser,
      adSnapshot: c.adSnapshot,
      lastMessageSnippet: lastMessage?.body.slice(0, 80),
      lastMessageAt: lastMessage?.createdAt?.toISOString(),
    });
  }

  return list;
}
```

### createMessage

Creates a new message in a conversation:

```typescript
async createMessage(
  conversationPublicId: string,
  userId: string,
  body: string
): Promise<SerializedMessage | null> {
  const conv = await Conversation.findOne({
    publicId: conversationPublicId,
    participants: toObjectId(userId),
    deletedByUserIds: { $ne: toObjectId(userId) },
  });

  if (!conv) return null;

  const trimmed = body.trim();
  if (!trimmed) return null;

  const msg = await Message.create({
    conversation: conv._id,
    sender: toObjectId(userId),
    body: trimmed,
  });

  // Update conversation timestamp
  await Conversation.updateOne(
    { _id: conv._id },
    { $set: { updatedAt: new Date() } }
  );

  return {
    id: msg._id.toString(),
    conversationId: conv.publicId,
    senderId: userId,
    body: msg.body,
    createdAt: msg.createdAt!.toISOString(),
  };
}
```

## Best Practices

### Security

1. **Always sanitize user input**: Use `mongo-sanitize` on all user inputs before database queries
2. **Verify ownership**: Check that user is a participant before allowing access to conversation
3. **Validate entity types**: Use a whitelist of allowed entity types
4. **Prevent self-chat**: Always check if userId === adOwnerId

### Performance

1. **Use indexes**: Ensure proper indexes on `participants`, `conversation`, and `createdAt`
2. **Limit message queries**: Use `.limit()` when fetching recent messages
3. **Throttle lastSeenAt updates**: Only update every 5 minutes to reduce DB writes
4. **Use lean queries**: Use `.lean()` for read-only queries to improve performance
5. **Polling interval**: Use 30 seconds (not too frequent, not too slow)

### UX

1. **Show loading states**: Display spinner during message sending and chat creation
2. **Disable inputs during operations**: Prevent duplicate submissions
3. **Show empty states**: Display helpful message when no messages exist
4. **Auto-scroll**: Consider auto-scrolling to latest message
5. **Enter key support**: Allow Enter to send, Shift+Enter for new line
6. **Display timestamps**: Show when message was sent
7. **Show ad snapshot**: Display ad details in chat for context
8. **Mobile responsiveness**: Toggle between list and chat on mobile

### Data Integrity

1. **Soft delete**: Use `deletedByUserIds` array instead of hard delete initially
2. **Ad snapshots**: Store ad data at conversation creation (handles deleted ads)
3. **Unique conversations**: Use compound index to prevent duplicate conversations
4. **Update conversation timestamp**: Update `updatedAt` when new message is sent
5. **Sort participants**: Always sort participant IDs consistently

## Error Handling

### Common Errors

1. **User not authenticated**:
   - Check: `getCurrentUser()` returns null
   - Response: `{ success: false, error: "Войдите в аккаунт" }`

2. **Ad not found**:
   - Check: `repository.getByPublicId()` returns null
   - Response: `{ success: false, error: "Объявление не найдено" }`

3. **Self-chat attempt**:
   - Check: `userId === adOwnerId`
   - Response: `{ success: false, error: "Нельзя начать чат с самим собой" }`

4. **Unsupported entity type**:
   - Check: `entityType` not in whitelist
   - Response: `{ success: false, error: "Этот тип объявления не поддерживается" }`

5. **Conversation not found**:
   - Check: `getConversationByPublicId()` returns null
   - Use: `notFound()` for page-level 404

## Testing Checklist

- [ ] Create conversation from ad detail page
- [ ] Send messages in conversation
- [ ] Receive messages (polling works)
- [ ] Delete conversation
- [ ] Navigate between conversations
- [ ] Mobile responsive behavior
- [ ] Empty states display correctly
- [ ] Error handling for all scenarios
- [ ] Last seen updates correctly
- [ ] Ad snapshot displays correctly
- [ ] Prevents self-chat
- [ ] Prevents duplicate conversations
- [ ] Authentication requirements enforced

## File Structure

```
client/src/
├── app/(private)/chat/
│   ├── page.tsx                          # Main chat page (list only)
│   ├── [chatId]/
│   │   └── page.tsx                      # Active chat page
│   └── _components/
│       ├── ChatClient/
│       │   ├── ChatClient.tsx            # Main layout component
│       │   └── ChatClient.styles.ts
│       ├── ChatList/
│       │   ├── ChatList.tsx              # Conversation list
│       │   ├── ChatListItem.tsx          # Individual conversation item
│       │   └── ChatListItem.styles.ts
│       ├── ActiveChat/
│       │   ├── ActiveChat.tsx            # Active conversation view
│       │   └── ActiveChat.styles.ts
│       └── EmptyStateNoMessages/
│           └── EmptyStateNoMessages.tsx  # Empty state component
├── lib/chat/
│   ├── models/
│   │   ├── Conversation.ts               # Conversation model
│   │   └── Message.ts                    # Message model
│   ├── types/
│   │   └── chat.types.ts                 # TypeScript types
│   ├── repository/
│   │   └── ChatRepository.ts             # Database operations
│   └── actions/
│       ├── getOrCreateChat.ts            # Create/retrieve conversation
│       ├── getChatList.ts                # Get all conversations
│       ├── getChatWithMessages.ts        # Get conversation with messages
│       ├── sendMessage.ts                # Send message
│       └── deleteChat.ts                 # Delete conversation
└── lib/auth/
    ├── models/
    │   └── User.ts                       # User model with lastSeenAt
    └── utils/
        └── auth.utils.ts                 # getCurrentUser with tracking
```

## References

- Example implementation: `client/src/app/(private)/chat/`
- Entity integration: `client/src/app/(public)/pets/for-sale/_components/PetForSaleDetailClient/PetForSaleDetailClient.tsx`
- Repository pattern: `client/src/lib/chat/repository/ChatRepository.ts`
- Server actions: `client/src/lib/chat/actions/`

## Future Enhancements

Consider these improvements for production:

1. **Real-time updates**: Replace polling with WebSockets or Server-Sent Events
2. **Read receipts**: Track when messages are read
3. **Typing indicators**: Show when other user is typing
4. **Rich media**: Support images, files, voice messages
5. **Push notifications**: Notify users of new messages
6. **Search**: Search conversations and messages
7. **Pagination**: Paginate message history for long conversations
8. **Presence**: Real-time online/offline status
9. **Message editing**: Allow editing sent messages
10. **Message reactions**: Add emoji reactions to messages
