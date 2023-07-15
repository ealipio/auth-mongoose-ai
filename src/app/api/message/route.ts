import { NextResponse } from 'next/server';
import { mongooseConnect } from '@/lib/mongoose';
import { Message } from '@/models/message';

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // http://localhost:3000/api/users?name=eisson
  const name = searchParams.get('name');
  const response = { user: 'cod3a', isAdmin: true, name };
  return NextResponse.json(response);
}

export async function POST(req: Request) {
  await mongooseConnect();
  const { author, message } = await req.json();
  if (author && message) {
    const messageDocument = await Message.create({ author, message });
    return NextResponse.json(messageDocument);
  }
  return NextResponse.json({
    error: 'bad request',
    detail: 'you need to send message and author',
  });
}
