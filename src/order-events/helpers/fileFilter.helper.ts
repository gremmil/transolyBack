import { NotFoundException, PayloadTooLargeException, UnprocessableEntityException } from "@nestjs/common";

export const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: Function) => {
  if (!file) return cb(new NotFoundException('File is empty'), false);
  const fileExtension = file.mimetype.split('/')[1];
  const allowedExtensions = /(JPG|JPEG|PNG|jpg|jpeg|png)$/;
  const maxSize = 10 * 1024 * 1024;
  if (!fileExtension.match(allowedExtensions)) {
    return cb(new UnprocessableEntityException(
      `Only image files are allowed: JPG|JPEG|PNG|jpg|jpeg|png`,
    ), false);
  }
  if (file.size > maxSize) {
    return cb(new PayloadTooLargeException(
      `File exceeds the maximum size allowed: 10MB`,
    ), false);
  }
  cb(null, true);
}