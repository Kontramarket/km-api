import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema(
  {
    users: {
      type: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

export interface Chat extends mongoose.Document {
  _id: string;
  users: string[];
  name: string;
}

export class CreateChat {
  @ApiProperty()
  users: string[];
  @ApiProperty()
  name: string;
}

export const ChatMessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Types.ObjectId,
      ref: 'chat',
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export interface Message extends mongoose.Document {
  _id: string;
  chatId: string;
  userId: string;
  message: string;
  seen: boolean;
}

export class CreateMessage {
  @ApiProperty()
  chatId: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  message: string;
}
