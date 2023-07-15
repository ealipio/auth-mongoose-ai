import { model, Schema, models } from 'mongoose';

const MessageSchema = new Schema(
  {
    author: { type: String, required: true },
    message: String,
  },
  {
    timestamps: true,
  }
);

export const Message = models.Message || model('Message', MessageSchema);
