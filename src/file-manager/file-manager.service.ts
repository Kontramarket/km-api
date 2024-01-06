import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as AWS from 'aws-sdk';
import { Model } from 'mongoose';
import { File } from './file-manager.model';

@Injectable()
export class FileManagerService {
  constructor(
    @InjectModel('file')
    private readonly fileModel: Model<File>,
  ) {}
  AWS_S3_BUCKET = 'km-beta';
  s3 = new AWS.S3({
    accessKeyId: 'AKIAV4AGEJKTWOZLKPFG',
    secretAccessKey: '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',
  });
  //Key form mongodb id
  async uploadFile(file, userId: string) {
    const { originalname } = file;
    const fileSave = new this.fileModel({
      name: originalname,
      owner: userId,
      size: file.size,
      change: userId,
    });
    await fileSave.save();

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      fileSave._id,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

  async serveFile(fileName: string) {
    const file = await this.fileModel.findOne({ name: fileName });
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: file._id.toString(),
    };
    return this.s3.getObject(params).createReadStream();
  }
}
