---
name: sima-detail-page
description: Detail page guidelines for displaying individual entity details with images, information, and owner actions
---

# Detail Page Guidelines

## Overview

Detail pages (e.g., `/vehicles/cars/[id]`, `/professional-service/[id]`) should follow a consistent structure using a server component page that fetches data and a client component that handles interactivity (image modals, owner actions). This pattern provides SEO benefits, server-side data fetching, and client-side interactivity where needed.

## Page Structure

### Dynamic Route Page (`[id]/page.tsx`)

- **Location**: `app/(public)/{category}/{entity}/[id]/page.tsx` (e.g., `app/(public)/vehicles/cars/[id]/page.tsx`)
- **Type**: Server Component (async)
- **Responsibility**: Fetch entity by publicId, handle not found, pass data to detail client component

#### Required Imports

```typescript
import { FC } from "react";
import { entityRepository } from "@/lib/{category}/{entity}/repository/{Entity}Repository";
import { notFound } from "next/navigation";
import EntityDetailClient from "../_components/{Entity}DetailClient/{Entity}DetailClient";
```

#### Page Component Pattern

```typescript
interface EntityPageProps {
  params: Promise<{ id: string }>;
}

const EntityPage: FC<EntityPageProps> = async ({ params }) => {
  const { id } = await params;
  const entity = await entityRepository.getByPublicId(id);
  if (!entity) {
    notFound();
  }
  return <EntityDetailClient entity={entity} />;
};

export default EntityPage;
```

**Key Points:**
- Use `Promise<{ id: string }>` for params in Next.js 15+
- Always await params before accessing properties
- Use `notFound()` from `next/navigation` when entity doesn't exist
- Pass the full serialized entity to the detail client component

## Detail Client Component (`{Entity}DetailClient.tsx`)

- **Location**: `app/(public)/{category}/{entity}/_components/{Entity}DetailClient/{Entity}DetailClient.tsx`
- **Type**: Client Component ("use client" directive)
- **Responsibility**: Display entity information, handle user interactions, manage modals, owner actions

### Component Structure

#### Required Imports

```typescript
"use client";
import React, { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { Badge, Text, Button, Link, Spinner, Flex } from "@radix-ui/themes";
import {
  PersonIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  CalendarIcon,
  ReaderIcon,
  IdCardIcon,
  Pencil1Icon,
  TrashIcon,
  // Add entity-specific icons as needed
} from "@radix-ui/react-icons";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { SerializedEntity } from "@/lib/{category}/{entity}/types/{entity}.types";
import ImageModal from "@/components/modals/ImageModal/ImageModal";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { deleteEntityAdWithRedirect } from "@/lib/{category}/{entity}/actions/deleteEntityAd";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import DeleteConfirmationModalWithServerAction from "@/components/modals/DeleteConfirmationModalWithServerAction/DeleteConfirmationModalWithServerAction";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
// Import entity type constant from @/lib/constants/entityTypes (e.g. ENTITY_TYPE_CARS, ENTITY_TYPE_VEHICLES_ACCESSORIES)
```

#### Component Props Interface

```typescript
interface EntityDetailClientProps {
  entity: SerializedEntity;
}
```

#### State Management

```typescript
const EntityDetailClient: React.FC<EntityDetailClientProps> = ({ entity }) => {
  // Delete action binding
  const deleteEntityAdByPublicId = deleteEntityAdWithRedirect.bind(null, entity.publicId);
  
  // Form state for delete action
  const [formState, formAction, isPending] = useActionState(
    deleteEntityAdByPublicId,
    undefined
  );
  
  // Modal states
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);
  
  // Image modal state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Auth state
  const { user: currentUser, thisUserIsOwner } = useAuth();
  const isAuthenticated = !!currentUser;
  const isOwner = thisUserIsOwner(entity.user.id);
  
  // ... component implementation
};
```

#### Error Handling

```typescript
useEffect(() => {
  if (formState && !formState.success && formState.error) {
    setErrorModalOpen(true);
  }
}, [formState]);

const handleModalClose = () => {
  setErrorModalOpen(false);
};
```

### Component Layout Structure

```typescript
return (
  <PageContainer size="4">
    {/* Header Section with Title and Owner Actions */}
    <HeaderSection>
      <Flex align="center" gap="3" wrap="wrap" style={{ flex: 1, minWidth: 0 }}>
        <PageTitle size="8" weight="bold">
          {/* Entity title - always visible */}
        </PageTitle>
        <LikeButton
          entityType={ENTITY_TYPE_ENTITY}
          publicId={publicId}
          size={20}
          stopPropagation={false}
        />
      </Flex>
      {isOwner && (
        <ButtonGroup>
          {/* Edit and Delete buttons */}
        </ButtonGroup>
      )}
    </HeaderSection>
    
    {/* Badges (location, category, publicId) */}
    <BadgeContainer>
      {/* Badge elements */}
    </BadgeContainer>
    
    {/* Main Content Grid */}
    <ContentGrid columns={{ initial: "1", md: "2" }}>
      {/* Image Gallery Section */}
      <ImageSection>
        {/* Single or multiple images with carousel */}
      </ImageSection>
      
      {/* Information Section */}
      <InfoCard>
        {/* Entity-specific information sections */}
      </InfoCard>
    </ContentGrid>
    
    {/* Modals */}
    <ImageModal />
    <ErrorModal />
    <DeleteConfirmationModalWithServerAction />
  </PageContainer>
);
```

## Image Gallery Implementation

### Single Image

```typescript
{images.length === 1 ? (
  <ImageCarouselContainer>
    <ImageWrapper onClick={() => handleImageClick(0)} style={{ cursor: "pointer" }}>
      <Image
        src={images[0].url}
        alt={images[0].originalName}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
      />
    </ImageWrapper>
  </ImageCarouselContainer>
) : (
  // Multiple images carousel
)}
```

### Multiple Images Carousel

```typescript
<ImageCarouselContainer>
  <CarouselSwiper
    modules={[Autoplay, Navigation, Pagination]}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    navigation
    pagination={{ clickable: true }}
    spaceBetween={10}
    slidesPerView={1}
    breakpoints={{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 1 },
    }}
  >
    {images.map((image, index) => (
      <SwiperSlide key={image.uniqueName}>
        <ImageWrapper onClick={() => handleImageClick(index)}>
          <Image
            src={image.url}
            alt={image.originalName}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
          />
        </ImageWrapper>
      </SwiperSlide>
    ))}
  </CarouselSwiper>
</ImageCarouselContainer>
```

### Image Click Handler

```typescript
const handleImageClick = (index: number) => {
  setSelectedImageIndex(index);
  setModalOpen(true);
};
```

## Information Display Patterns

### Basic Information Section

```typescript
<InfoSection>
  <InfoTitle size="5">
    <IdCardIcon width="20" height="20" />
    Основная информация
  </InfoTitle>
  <InfoRow>
    <Text size="3" weight="bold">
      {/* Primary title */}
    </Text>
  </InfoRow>
  {/* Additional info rows */}
</InfoSection>
```

### Information Row Pattern

```typescript
<InfoRow>
  <Text size="3" color="gray">
    Label:
  </Text>
  <Text size="3" weight="medium">
    {value}
  </Text>
</InfoRow>
```

### Optional Fields Pattern

```typescript
{optionalField && (
  <InfoRow>
    <Text size="3" color="gray">
      Label:
    </Text>
    <Text size="3" weight="medium">
      {optionalField}
    </Text>
  </InfoRow>
)}
```

### Description Section

```typescript
<InfoSection>
  <InfoTitle size="5">
    <ReaderIcon width="20" height="20" />
    Описание
  </InfoTitle>
  <DescriptionBox>
    <Text size="3" style={{ whiteSpace: "pre-wrap" }}>
      {description}
    </Text>
  </DescriptionBox>
</InfoSection>
```

**Key Points:**
- Use `whiteSpace: "pre-wrap"` for descriptions to preserve line breaks
- Always check for optional fields before rendering
- Use consistent text sizes and weights for labels vs values

## Contact Information Display

### Contact Section Pattern

```typescript
<ContactSection>
  <InfoTitle size="5">Контактная информация</InfoTitle>

  {/* Contact Name */}
  <ContactItem>
    <PersonIcon width="18" height="18" />
    <Text size="3" weight="medium">
      {contactName}
    </Text>
  </ContactItem>

  {/* Email - Always Masked */}
  <ContactItem>
    <EnvelopeClosedIcon width="18" height="18" />
    <Text size="3">*** ***********</Text>
  </ContactItem>

  {/* Phone - Visible Only if Authenticated */}
  {isAuthenticated ? (
    <>
      <ContactItem>
        <MobileIcon width="18" height="18" />
        <Text size="3" weight="bold">
          {contactPrimaryPhone}
        </Text>
      </ContactItem>
      {contactSecondaryPhone && (
        <ContactItem>
          <MobileIcon width="18" height="18" />
          <Text size="3" weight="bold">
            {contactSecondaryPhone}
          </Text>
        </ContactItem>
      )}
    </>
  ) : (
    <ContactItem>
      <MobileIcon width="18" height="18" />
      <Text size="2" color="gray">
        Войдите, чтобы увидеть номер телефона
      </Text>
    </ContactItem>
  )}
</ContactSection>
```

**Key Points:**
- Email is always masked: `*** ***********`
- Phone numbers are only visible to authenticated users
- Show helpful message for unauthenticated users
- Use `weight="bold"` for phone numbers when visible

## Owner Actions

### Header Section with Owner Actions

```typescript
<HeaderSection>
  <Flex align="center" gap="3" wrap="wrap" style={{ flex: 1, minWidth: 0 }}>
    <PageTitle size="8" weight="bold">
      {entityTitle}
    </PageTitle>
    <LikeButton
      entityType={ENTITY_TYPE_ENTITY}
      publicId={publicId}
      size={20}
      stopPropagation={false}
    />
  </Flex>
  {isOwner && (
    <ButtonGroup>
      <Button disabled={isPending} asChild size="3" variant="soft">
        <Link
          color="yellow"
          href={`/publish-ad/{category}/{entity}/edit/${entity.publicId}`}
        >
          <Pencil1Icon width="18" height="18" />
          Редактировать
        </Link>
      </Button>

      <Button
        style={{ cursor: "pointer", minWidth: "125px" }}
        size="3"
        variant="soft"
        color="red"
        disabled={isPending}
        onClick={() => setDeleteConfirmationModalOpen(true)}
      >
        <TrashIcon width="18" height="18" />
        {isPending ? <Spinner size="3" /> : "Удалить"}
      </Button>
    </ButtonGroup>
  )}
</HeaderSection>
```

**Key Points:**
- Title and LikeButton are siblings inside a Flex with `align="center"` and `gap="3"` for proper alignment and spacing; do not nest LikeButton inside PageTitle.
- Title is always visible (not just for owners)
- Edit and Delete buttons only show for owners
- Disable buttons during pending state
- Use appropriate edit route: `/publish-ad/{category}/{entity}/edit/${publicId}`

### Delete Confirmation Modal

```typescript
<DeleteConfirmationModalWithServerAction
  open={deleteConfirmationModalOpen}
  onOpenChange={setDeleteConfirmationModalOpen}
  onConfirm={formAction}
  isPending={isPending}
/>
```

## Date Formatting

### Format Date Function

```typescript
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
```

### Usage in Meta Information

```typescript
<MetaInfo>
  <MetaItem>
    <CalendarIcon width="16" height="16" />
    <Text size="2">Опубликовано: {formatDate(createdAt)}</Text>
  </MetaItem>
</MetaInfo>
```

## Styled Components

### Styled Components File (`{Entity}DetailClient.styles.ts`)

- **Location**: Same directory as detail client component
- **Type**: Client Component ("use client" directive)
- **Pattern**: Extend Radix UI components when possible

#### Required Styled Components

```typescript
"use client";
import styled from "styled-components";
import { Box, Card, Container, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const PageContainer = styled(Container)`
  padding: var(--space-4);
  
  @media (min-width: 768px) {
    padding: var(--space-6);
  }
  
  @media (min-width: 1024px) {
    padding: var(--space-8);
  }
`;

export const HeaderSection = styled(Flex)`
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const PageTitle = styled(Heading)`
  margin: 0;
`;

export const ButtonGroup = styled(Flex)`
  gap: var(--space-3);
  flex-wrap: wrap;
  
  @media (max-width: 640px) {
    width: 100%;
    
    button {
      flex: 1;
    }
  }
`;

export const ContentGrid = styled(Grid)`
  gap: var(--space-5);
  margin-top: var(--space-5);
`;

export const ImageSection = styled(Section)`
  padding: 0;
  width: 100%;
  min-height: 200px;
  height: 100%;
  position: relative;
`;

export const ImageCarouselContainer = styled(Box)`
  width: 100%;
  height: 400px;
  border-radius: var(--radius-4);
  overflow: hidden;
  position: relative;
  background: var(--gray-3);
  
  @media (min-width: 768px) {
    height: 500px;
  }
  
  @media (min-width: 1024px) {
    height: 600px;
  }
`;

export const CarouselSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  
  .swiper-slide {
    height: 100%;
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  /* Navigation buttons styling */
  .swiper-button-next,
  .swiper-button-prev {
    color: var(--gray-12);
    background: var(--gray-1);
    width: 36px;
    height: 36px;
    border-radius: var(--radius-3);
    box-shadow: var(--shadow-4);
    transition: all 0.2s ease;
    
    &:after {
      font-size: 14px;
      font-weight: bold;
    }
    
    &:hover {
      background: var(--accent-9);
      color: var(--gray-1);
      transform: scale(1.1);
    }
    
    &.swiper-button-disabled {
      opacity: 0.3;
      cursor: not-allowed;
      
      &:hover {
        background: var(--gray-1);
        color: var(--gray-12);
        transform: none;
      }
    }
    & > svg {
      width: 50%;
      height: 50%;
    }
  }
  
  /* Pagination styling */
  .swiper-pagination {
    bottom: 10px;
    
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background: var(--gray-1);
      opacity: 0.6;
      transition: all 0.3s ease;
      border: 2px solid var(--gray-12);
      
      &:hover {
        opacity: 0.8;
        transform: scale(1.2);
      }
    }
    
    .swiper-pagination-bullet-active {
      background: var(--accent-9);
      opacity: 1;
      width: 12px;
      height: 12px;
      border-color: var(--accent-9);
    }
  }
`;

export const ImageWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
`;

export const InfoCard = styled(Card)`
  padding: var(--space-5);
  
  @media (min-width: 768px) {
    padding: var(--space-6);
  }
`;

export const InfoSection = styled(Box)`
  margin-bottom: var(--space-5);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoTitle = styled(Heading)`
  margin-bottom: var(--space-3);
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

export const InfoRow = styled(Flex)`
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ContactSection = styled(Box)`
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--gray-6);
`;

export const ContactItem = styled(Flex)`
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-3);
  background: var(--gray-2);
  margin-bottom: var(--space-3);
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background: var(--gray-3);
  }
`;

export const BadgeContainer = styled(Flex)`
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-bottom: var(--space-3);
`;

export const DescriptionBox = styled(Box)`
  padding: var(--space-4);
  background: var(--gray-2);
  border-radius: var(--radius-3);
  line-height: 1.6;
  max-height: 200px;
  overflow: hidden;
  overflow-y: auto;
`;

export const MetaInfo = styled(Flex)`
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--gray-6);
`;

export const MetaItem = styled(Flex)`
  align-items: center;
  gap: var(--space-2);
  color: var(--gray-11);
  font-size: var(--font-size-2);
`;
```

## Icon Usage Guidelines

### Available Icons

Always use icons from `@radix-ui/react-icons`. Common icons include:
- `PersonIcon` - Contact person
- `EnvelopeClosedIcon` - Email
- `MobileIcon` - Phone
- `CalendarIcon` - Date/time
- `ReaderIcon` - Description/content
- `IdCardIcon` - Identification/info
- `Pencil1Icon` - Edit
- `TrashIcon` - Delete
- `GearIcon` - Technical/settings
- `LightningBoltIcon` - Features/accessories

**Important:** Before using any icon, verify it exists in `@radix-ui/react-icons`. If an icon doesn't exist, use a text label instead of trying non-existent icons.

### Icon Sizing

- Section titles: `width="20" height="20"`
- Contact items: `width="18" height="18"`
- Meta items: `width="16" height="16"`
- Action buttons: `width="18" height="18"`

## Helper Functions

### Formatting Functions

Create entity-specific formatting functions when needed:

```typescript
// Example: Price formatting
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", { style: "currency", currency: "ILS" }).format(price);
};

// Example: Enum value formatting
const formatEnumValue = (value: EnumType): string => {
  switch (value) {
    case EnumType.VALUE1:
      return "Display Value 1";
    case EnumType.VALUE2:
      return "Display Value 2";
    default:
      return value;
  }
};
```

## Best Practices

### 1. Server/Client Component Separation

- **Page component**: Server component for data fetching and SEO
- **Detail client component**: Client component for interactivity (modals, actions)
- Never mix server-side data fetching with client-side interactivity in the same component

### 2. Image Handling

- Always check if images array exists and has length
- Handle single image differently from multiple images
- Make images clickable to open full-screen modal
- Use Next.js Image component with proper sizing

### 3. Optional Fields

- Always check for optional fields before rendering: `{field && (...)}`
- Use consistent formatting for optional fields
- Group related optional fields in the same section

### 4. Authentication and Ownership

- Check authentication status for phone number visibility
- Check ownership status for edit/delete buttons
- Use `thisUserIsOwner` from `useAuth` hook

### 5. Error Handling

- Use ErrorModal for displaying action errors
- Handle pending states for async actions
- Provide user feedback during loading states

### 6. Responsive Design

- Use Radix UI responsive props where possible
- Use CSS media queries only when necessary (see styling guidelines)
- Test on mobile and desktop viewports

### 7. Accessibility

- Use semantic HTML elements
- Provide alt text for images
- Use proper heading hierarchy
- Ensure keyboard navigation works

## File Structure

```
app/(public)/{category}/{entity}/
├── [id]/
│   └── page.tsx                    # Dynamic route page (Server Component)
└── _components/
    └── {Entity}DetailClient/
        ├── {Entity}DetailClient.tsx     # Main client component
        └── {Entity}DetailClient.styles.ts  # Styled components
```

## Common Patterns

### Badge Display

```typescript
<BadgeContainer>
  <Badge size="2" color="green" variant="soft">
    {locationName}
  </Badge>
  <Badge size="2" color="gray" variant="outline">
    #{publicId}
  </Badge>
</BadgeContainer>
```

### Conditional Rendering

```typescript
{optionalSection && (
  <InfoSection>
    {/* Section content */}
  </InfoSection>
)}
```

### Loading States

```typescript
<Button disabled={isPending}>
  {isPending ? <Spinner size="3" /> : "Action Text"}
</Button>
```

## References

- Follow the pattern established in:
  - `app/(public)/vehicles/cars/[id]/page.tsx`
  - `app/(public)/vehicles/cars/_components/CarDetailClient/CarDetailClient.tsx`
  - `app/(public)/professional-service/[id]/page.tsx`
  - `app/(public)/professional-service/_components/ProfessionalServiceDetailClient/ProfessionalServiceDetailClient.tsx`
