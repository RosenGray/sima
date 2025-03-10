import { Box, Grid, IconButton } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { FC, useMemo } from "react";
import { MaxImages } from "./ImagesPreviewer.interface";
import classes from "./ImagesPreviewer.module.scss";
import { mapMaxImagesToNumberColumnsAndRows } from "./ImagesPreviewer.utils";

interface ImagesPreviewerProps {
  images: File | File[];
  setImages: (images: File[]) => void;
  maxImages: MaxImages;
}

const ImagesPreviewer: FC<ImagesPreviewerProps> = ({ images, setImages,maxImages }) => {
  const { columns, rows } = mapMaxImagesToNumberColumnsAndRows(maxImages);
  const files = Array.isArray(images) ? images : [images];
  const filesWithPreview = useMemo(() => {
    return files.map((file) => ({
      ...file,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));
  }, [images]);

  const handleRemoveImage = (file: File) => {
    console.log("file.name", file);
    setImages(files.filter((f) => f.name !== file.name));
  };

  return (
    <Box
      className={classes.ImagesPreviewer}
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
        <div className={classes.ImagesPreviewer__GridItem}>
          <Image fill src={filesWithPreview[0].previewUrl} alt="Image" />
          <IconButton
            className={classes.ImagesPreviewer__DeleteButton}
            onClick={() => handleRemoveImage(filesWithPreview[0])}
          >
            <TrashIcon />
          </IconButton>
        </div>
        <Grid columns={columns} rows={rows} gap="2">
          {filesWithPreview.slice(1).map((file) => {
            return (
              <div
                key={file.name}
                className={classes.ImagesPreviewer__GridItem}
              >
                <Image fill src={file.previewUrl} alt="Image" />
                <IconButton
                  className={classes.ImagesPreviewer__DeleteButton}
                  onClick={() => handleRemoveImage(file)}
                >
                  <TrashIcon />
                </IconButton>
              </div>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImagesPreviewer;
