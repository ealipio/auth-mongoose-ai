import { NextResponse } from 'next/server';
import { mongooseConnect } from '@/lib/mongoose';
import { Users } from '@/models/users';

export async function GET(req: Request) {
  await mongooseConnect();
  const users = await Users.find({});
  return NextResponse.json(users);
}
