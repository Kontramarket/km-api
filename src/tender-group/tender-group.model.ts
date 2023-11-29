import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const TenderGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    parentGroup: {
      type: mongoose.Schema.Types.ObjectId,
      default: '',
      ref: 'tender-group',
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export interface TenderGroup extends mongoose.Document {
  _id: string;
  name: string;
  parentGroup: string;
  hidden: boolean;
}

export class CreateTenderGroupDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  parentGroup: string;
}

export class UpdateTenderGroupDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  parentGroup: string;
  @ApiProperty()
  hidden: boolean;
}
