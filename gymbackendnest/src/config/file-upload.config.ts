import { diskStorage } from 'multer';
import { extname } from 'path';

export const imageUploadOptions = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  storage: diskStorage({
    destination: './uploads',

    filename: (req, file, callback) => {
      const originalFileName = file.originalname;
      const fileNameLength = originalFileName.length;
      // Get the part of the string before the fourth-last character
      const firstPart = originalFileName.slice(0, fileNameLength - 4);
      // Concatenate the two parts to form the new filename
      const newFileName = firstPart;
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      //const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
      const filename = `${newFileName}-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
};
