import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    permissionLevel: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3],
    },
    change: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  permissionLevel: number;
  change: string;
}

export class RegisterUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  permissionLevel: number;
}

export class LoginUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
