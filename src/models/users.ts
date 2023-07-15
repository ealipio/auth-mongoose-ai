import { model, Schema, models } from 'mongoose';

const UsersSchema = new Schema(
  {
    name: { type: String, required: [true, 'please provide the name'] },
    email: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

export const Users = models.Users || model('Users', UsersSchema);
