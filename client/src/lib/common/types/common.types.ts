
type ImageItem = {
    id: string; // unique identifier
    url: string; // for display (object URL for File, S3 URL for existing)
    file?: File; // only present for new uploads
    metadata?: Record<string, unknown>; // S3 metadata for existing images
    isExisting: boolean; // flag to differentiate
  };

export type { ImageItem };