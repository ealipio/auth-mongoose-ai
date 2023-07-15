import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import type { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';

import { mongooseConnect } from '@/lib/mongoose';

const mongoDBAdapter = mongooseConnect();

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(mongoDBAdapter) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
};
