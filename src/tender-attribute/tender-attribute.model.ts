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
    //Types 0:Text, 1:Number, 2: Checkbox, 3: Radius, 4: Dropdown
    type: {
      type: Number,
      default: 0,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export interface TenderAttribute extends mongoose.Document {
  _id: string;
  groupId: string;
  name: string;
  type: number;
  hidden: boolean;
}

export class CreateTenderAttributeDto {
  @ApiProperty()
  groupId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: number;
}

export class UpdateTenderAttributeDto {
  @ApiProperty()
  groupId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: number;
}
