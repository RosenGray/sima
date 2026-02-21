import { MaxImages } from "./ImagesPreviewer.interface";

export const mapMaxImagesToNumberColumnsAndRows = (maxImages: MaxImages) => {
  switch (maxImages) {
    case 1:
      return { columns: "1", rows: "1" };
    default:
      return { columns: "2", rows: "2" };
  }
};
