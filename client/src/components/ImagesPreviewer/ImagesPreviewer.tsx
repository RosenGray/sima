import { Grid } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useCallback, useMemo } from "react";
import { MaxImages } from "./ImagesPreviewer.interface";
import {
  ImagePreviewerContainerBox,
  GridItem,
  DeleteButton,
} from "./ImagesPreviewer.styles";
import { mapMaxImagesToNumberColumnsAndRows } from "./ImagesPreviewer.utils";
import { ExistingImageItem } from "@/app/api/files/create/route";
import { nanoid } from "nanoid";

interface ImagesPreviewerProps {
  images: File | File[];
  existingImages: ExistingImageItem[];
  setImages: Dispatch<SetStateAction<File[]>>;
  setExistingImages: Dispatch<SetStateAction<ExistingImageItem[]>>;
  maxImages: MaxImages;
}

type ImageItem = {
  id: string;
  name: string;
  previewUrl: string;
  isExisting: boolean;
};

const ImagesPreviewer: FC<ImagesPreviewerProps> = ({
  images,
  existingImages,
  setImages,
  setExistingImages,
  maxImages,
}) => {
  const { columns, rows } = mapMaxImagesToNumberColumnsAndRows(maxImages);
  const files = useMemo(() => {
    return Array.isArray(images) ? images : [images];
  }, [images]);
  const filesWithPreview = useMemo(() => {
    return files.map((file) => ({
      ...file,
      id: nanoid(10),
      name: file.name,
      previewUrl: URL.createObjectURL(file),
      isExisting: false,
    }));
  }, [files]);
  const existingImagesWithPreview = useMemo(() => {
    return existingImages
      .filter((image) => !image.toBeDeleted)
      .map((image) => ({
        ...image,
        id: image.id,
        name: image.originalName,
        previewUrl: image.url,
      }));
  }, [existingImages]);

  console.log("existingImagesWithPreview", existingImagesWithPreview);
  // Combine existing images and new files into a single array
  const allImages = useMemo(() => {
    return [...existingImagesWithPreview, ...filesWithPreview];
  }, [existingImagesWithPreview, filesWithPreview]);

  const handleRemoveImage = useCallback((image: ImageItem) => {
    // setImages(files.filter((f) => f.name !== file.name));
    {
      if (image.isExisting) {
        console.log("image is existing", image);
        setExistingImages((e) => {
          return e.map((i) =>
            i.id === image.id ? { ...i, toBeDeleted: true } : i
          );
        });
        // setExistingImages(existingImages.filter((i) => i.id !== image.id));
      } else {
        console.log("image is not existing", image);
        setImages((i) => i.filter((f) => f.name !== image.name));
        // setImages(files.filter((f) => f.name !== image.name));
      }
    }
  }, [setExistingImages, setImages]);



  const renderImages = () => {
    return allImages.slice(1).map((image) => {
      return (
        <GridItem key={image.id} className={GridItem}>
          <Image fill src={image.previewUrl} alt="Image" />
          <DeleteButton type="button" color="red" onClick={() => handleRemoveImage(image)}>
            <TrashIcon />
          </DeleteButton>
        </GridItem>
      );
    });
  };
  if (allImages.length === 0) {
    return null;
  }

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
          <Image fill src={allImages[0].previewUrl} alt="Image" />
          <DeleteButton type="button" color="red" onClick={() => handleRemoveImage(allImages[0])}>
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
