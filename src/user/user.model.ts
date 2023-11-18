import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
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
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    mb: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    website: {
      type: String,
    },
    locationPin: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      required: true,
      default: 'mica.png',
    },
    targetGroups: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    tempVerifyCode: {
      type: String,
      default: null,
    },
    sso: {
      type: String,
    },
    theme: {
      type: String,
      require: true,
      default: 1,
    },
    premium: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  _id: string;
  email: string;
  password: string;
  permissionLevel: number;
  firstName: string;
  lastName: string;
  dob: string;
  username: string;
  mb: string;
  address: string;
  zip: number;
  website: string;
  locationPin: string;
  avatar: string;
  targetGroups: string;
  phoneNumber: string;
  tempVerifyCode: string;
  sso: string;
  theme: string;
  premium: boolean;
}

export class RegisterUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  permissionLevel: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  dob: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  mb: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  zip: number;
  @ApiProperty()
  website: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  targetGroups: string;
  @ApiProperty()
  phoneNumber: string;
}

export class LoginUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
