import * as mongoose from 'mongoose';

export const FileManagerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    size: {
      type: Number,
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

export interface File extends mongoose.Document {
  _id: string;
  name: string;
  size: number;
  owner: string;
  change: string;
}
