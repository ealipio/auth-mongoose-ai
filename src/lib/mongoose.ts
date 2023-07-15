import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

export async function mongooseConnect() {
  if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.getClient();
  }
  mongoose.connect(uri);
  return mongoose.connection.getClient();
}
