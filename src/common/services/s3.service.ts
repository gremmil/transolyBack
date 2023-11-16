import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: S3;
  private putObjReq: S3.PutObjectRequest;
  private deleteObjReq: S3.DeleteObjectRequest;

  constructor() {

    const { BUCKET_NAME, BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, S3_ENDPOINT } = process.env;
    this.s3 = new S3({
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: BUCKET_REGION,
      endpoint: `https://${S3_ENDPOINT}`,
      s3ForcePathStyle: false,
    });
    this.putObjReq = {
      Bucket: BUCKET_NAME,
      ACL: 'public-read',
      Key: ''
    }
    this.deleteObjReq = {
      Bucket: BUCKET_NAME,
      Key: ''
    }
  }

  async uploadFile(fileKey: string, blob: Blob): Promise<string> {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    this.putObjReq.Key = fileKey;
    this.putObjReq.Body = buffer;
    this.putObjReq.ContentType = blob.type

    return new Promise((resolve, reject) => {
      this.s3.upload(this.putObjReq, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  }

  async uploadFiles(files: { [fileKey: string]: Blob }): Promise<{ [fileKey: string]: string }> {
    const uploadedFiles: { [fileKey: string]: string } = {};

    for (const fileKey in files) {
      const content = files[fileKey];

      try {
        const location = await this.uploadFile(fileKey, content);
        uploadedFiles[fileKey] = location;
      } catch (err) {
        for (const uploadedFileKey in uploadedFiles) {
          await this.deleteFile(uploadedFileKey);
        }
        throw err;
      }
    }

    return uploadedFiles;
  }

  async deleteFile(fileKey: string): Promise<void> {
    this.deleteObjReq.Key = fileKey;

    return new Promise((resolve, reject) => {
      this.s3.deleteObject(this.deleteObjReq, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async editFile(fileKey: string, newContent: Buffer): Promise<string> {

    this.putObjReq.Key = fileKey;
    this.putObjReq.Body = newContent;

    return new Promise((resolve, reject) => {
      this.s3.upload(this.putObjReq, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  }
}
