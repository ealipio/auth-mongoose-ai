import { model, Schema, models } from 'mongoose';

interface UsersType {
  name: string;
  email: string;
  image?: string;
}

const UsersSchema = new Schema<UsersType>(
  {
    name: { type: String, required: [true, 'please provide the name'] },
    email: { type: String, required: true },
    image: String,
  },
  {
    timestamps: true,
  }
);

export const Users = models.Users || model<UsersType>('Users', UsersSchema);
