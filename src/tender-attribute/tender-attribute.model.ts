import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const TenderAttributeSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'Text',
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    change: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true },
);

export interface TenderAttribute extends mongoose.Document {
  _id: string;
  groupId: string;
  name: string;
  type: string;
  hidden: boolean;
  change: string;
}

export class CreateTenderAttributeDto {
  @ApiProperty()
  groupId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
}

export class UpdateTenderAttributeDto {
  @ApiProperty()
  groupId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
}
