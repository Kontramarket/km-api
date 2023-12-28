import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const UserGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    parentGroup: {
      type: mongoose.Schema.Types.ObjectId,
      default: '',
      ref: 'user-group',
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

export interface UserGroup extends mongoose.Document {
  _id: string;
  name: string;
  parentGroup: string;
  hidden: boolean;
  change: string;
}

export class CreateUserGroupDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  parentGroup: string;
}

export class UpdateUserGroupDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  parentGroup: string;
  @ApiProperty()
  hidden: boolean;
}
