import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const NewsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
    },
    change: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true },
);

export interface News extends mongoose.Document {
  _id: string;
  name: string;
  description: string;
  type: string;
  change: string;
}

export class CreateNewsDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  type: string;
}

export class UpdateNewsDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  type: string;
}
