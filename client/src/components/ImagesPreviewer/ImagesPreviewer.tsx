import { Box, Grid } from "@radix-ui/themes";
import Image from "next/image";
import classes from "./ImagesPreviewer.module.scss";
import { FC, useMemo } from "react";

interface ImagesPreviewerProps {
  images: File | File[];
}

const ImagesPreviewer: FC<ImagesPreviewerProps> = ({ images }) => {
  const files = Array.isArray(images) ? images : [images];
  const filesWithPreview = useMemo(() => {
    return files.map((file) => ({
      ...file,
      previewUrl: URL.createObjectURL(file),
    }));
  }, [images]);
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
        </div>
        <Grid columns="2" rows="2" gap="2">
          {filesWithPreview.slice(1).map((file) => {
            console.log('file.name',file.name)
            return (
              <div
                key={file.name}
                className={classes.ImagesPreviewer__GridItem}
              >
                <Image fill src={file.previewUrl} alt="Image" />
              </div>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImagesPreviewer;
