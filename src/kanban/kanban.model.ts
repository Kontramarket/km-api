import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const KanbanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'card' }],
    change: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    allowed: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    label: {
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

export interface Kanban extends mongoose.Document {
  _id: string;
  title: string;
  label: string;
  cards: string[];
  allowed: number;
  change: string;
}

export interface Card extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  label: string;
  change: string;
}

export class CreateListDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  label: string;
  @ApiProperty()
  allowed: number;
}

export class CreateCardDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  label: string;
}

export class UpdateListDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  label: string;
  @ApiProperty()
  allowed: number;
}

export class UpdateCardDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  label: string;
}
