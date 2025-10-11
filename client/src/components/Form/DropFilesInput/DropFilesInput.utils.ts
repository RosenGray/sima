// const handleFileRejection = (
//   fileRejections: readonly FileRejection[],
//   maxFiles?: number,
//   sizeInMb?: number
// ) => {
//   const error = fileRejections[0].errors[0];
//   if (error.code === "too-many-files") {
//     error.message = `Максимальное количество файлов: ${maxFiles}`;
//   } else if (error.message.includes("File is larger than")) {
//     error.message = `Файл слишком большой. Максимальный размер файла ${sizeInMb} Мб`;
//   } else if (error.message.includes("File type must be")) {
//     error.message = "Файл должен быть изображением (PNG, JPEG, JPG или WebP)";
//   } else if (error.message.includes("No files were accepted")) {
//     error.message = "Загрузите хотя бы одно изображение";
//   }
//   return error.message;
// };

{
    /* {fileRejections.length > 0 && (
            <div className={styles.dropzone__error}>
              <p>{handleFileRejection(fileRejections, maxFiles, sizeInMb)}</p>
            </div>
          )} */
  }