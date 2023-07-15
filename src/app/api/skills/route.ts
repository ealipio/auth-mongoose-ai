import { NextResponse } from 'next/server';

type Feedback = {
  name: string;
  email: string;
  message: string;
};

const handler = async (request: Request) => {
  const data: Feedback = await request.json();
  console.log(data);

  const { name } = data;
  return NextResponse.json({ name, isActive: true });
};

export { handler as POST };
