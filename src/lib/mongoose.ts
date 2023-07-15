import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
export function mongooseConnect() {
  if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    return mongoose.connect(uri);
  }
}

export async function connectAndGetClient() {
  if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.getClient();
  }
  await mongoose.connect(uri);
  return mongoose.connection.getClient();
}
