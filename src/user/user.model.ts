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
      type: String,
      required: true,
    },
    change: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    online: {
      type: Boolean,
      default: false,
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
  online: boolean;
}

export class RegisterUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  permissionLevel: string;
}

export class LoginUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
export class PasswordResetDto {
  @ApiProperty()
  email: string;
}
export class PasswordRecoveryDto {
  @ApiProperty()
  newPassword: string;
}
