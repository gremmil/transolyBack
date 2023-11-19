export class FilesOrderEventDto {
  mainImage: Express.Multer.File[];
  referenceImage: Express.Multer.File[];
}
export class BodyFilesOrderEventDto {
  orderEventId: string; orderNumber: string; companyId: number;
}