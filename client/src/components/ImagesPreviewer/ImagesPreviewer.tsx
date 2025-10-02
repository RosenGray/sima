import { Box, Grid, IconButton } from "@radix-ui/themes";
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

interface ImagesPreviewerProps {
  images: File | File[];
  setImages: (images: File[]) => void;
  maxImages: MaxImages;
}

const ImagesPreviewer: FC<ImagesPreviewerProps> = ({
  images,
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

  const handleRemoveImage = (file: File) => {
    console.log("file.name", file);
    setImages(files.filter((f) => f.name !== file.name));
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
          <Image fill src={filesWithPreview[0].previewUrl} alt="Image" />
          <DeleteButton
            className={DeleteButton}
            onClick={() => handleRemoveImage(filesWithPreview[0])}
          >
            <TrashIcon />
          </DeleteButton>
        </GridItem>
        <Grid columns={columns} rows={rows} gap="2">
          {filesWithPreview.slice(1).map((file) => {
            return (
              <GridItem key={file.name} className={GridItem}>
                <Image fill src={file.previewUrl} alt="Image" />
                <DeleteButton onClick={() => handleRemoveImage(file)}>
                  <TrashIcon />
                </DeleteButton>
              </GridItem>
            );
          })}
        </Grid>
      </Grid>
    </ImagePreviewerContainerBox>
  );
};

export default ImagesPreviewer;
