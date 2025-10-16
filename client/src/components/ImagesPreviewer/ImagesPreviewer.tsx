import { Grid } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { FC, useMemo } from "react";
import { MaxImages } from "./ImagesPreviewer.interface";
import {
  ImagePreviewerContainerBox,
  GridItem,
  DeleteButton,
} from "./ImagesPreviewer.styles";
import { mapMaxImagesToNumberColumnsAndRows } from "./ImagesPreviewer.utils";
import { FileUploadResponse } from "@/app/api/files/create/route";

interface ImagesPreviewerProps {
  images: File | File[];
  existingImages: FileUploadResponse["files"];
  setImages: (images: File[]) => void;
  maxImages: MaxImages;
}

const ImagesPreviewer: FC<ImagesPreviewerProps> = ({
  images,
  existingImages,
  setImages,
  maxImages,
}) => {
  const { columns, rows } = mapMaxImagesToNumberColumnsAndRows(maxImages);
  const files = useMemo(() => {
    return Array.isArray(images) ? images : [images];
  }, [images]);
  const filesWithPreview = useMemo(() => {
    return files.map((file) => ({
      ...file,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));
  }, [files]);
  const existingImagesWithPreview = useMemo(() => {
    return existingImages.map((image) => ({
      ...image,
      name: image.originalName,
      previewUrl: image.url,
    }));
  }, [existingImages]);

  // Combine existing images and new files into a single array
  const allImages = useMemo(() => {
    return [...existingImagesWithPreview, ...filesWithPreview];
  }, [existingImagesWithPreview, filesWithPreview]);

  const handleRemoveImage = (file: File) => {
    setImages(files.filter((f) => f.name !== file.name));
  };

  const renderImages = () => {
    return allImages.slice(1).map((image) => {
      return (
        <GridItem key={image.name} className={GridItem}>
          <Image fill src={image.previewUrl} alt="Image" />
          {/* <DeleteButton onClick={() => handleRemoveImage(file)}>
                <TrashIcon />
              </DeleteButton> */}
        </GridItem>
      );
    });
  };

  return (
    <ImagePreviewerContainerBox
      height={{
        initial: "200px",
        // xs: "500px",
        sm: "350px",
        // md: "350px",
        // lg: "350px",
        // xl: "350px",
      }}
    >
      <Grid height="100%" columns="2" gap="2">
        <GridItem>
          <Image
            fill
            src={allImages[0].previewUrl}
            alt="Image"
          />
          <DeleteButton
            className={DeleteButton}
            // onClick={() => handleRemoveImage(filesWithPreview[0])}
          >
            <TrashIcon />
          </DeleteButton>
        </GridItem>
        <Grid columns={columns} rows={rows} gap="2">
          {renderImages()}
        </Grid>
      </Grid>
    </ImagePreviewerContainerBox>
  );
};

export default ImagesPreviewer;
