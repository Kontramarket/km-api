import * as mongoose from 'mongoose';

export const LoggerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true },
);

export interface Log extends mongoose.Document {
  _id: string;
  userId: string;
  type: string;
  data: object;
}
