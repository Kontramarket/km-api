import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    change: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true },
);

export interface Admin extends mongoose.Document {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  change: string;
}

export class RegisterAdminDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}

export class UpdateAdminDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}
