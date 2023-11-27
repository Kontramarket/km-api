import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const TenderSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    data: {
      type: Array<string>,
      required: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export interface Tender extends mongoose.Document {
  _id: string;
  groupId: string;
  ownerId: string;
  data: Array<string>;
  hidden: boolean;
}

export class CreateTenderDto {
  @ApiProperty()
  groupId: string;
  @ApiProperty()
  data: Array<string>;
}

export class UpdateTenderDto {
  @ApiProperty()
  groupId: string;
  @ApiProperty()
  data: Array<string>;
}
