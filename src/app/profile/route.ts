import { NextResponse, type NextRequest } from 'next/server';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
  redirect('https://nextjs.org/');
}

export async function PATCH(request: NextRequest) {
  //const requestHeaders = new Headers(request.headers);
  const headersList = headers();
  const referer = headersList.get('referer');

  if (referer) {
    return new Response('Hello, Next.js!', {
      status: 200,
      headers: { referer },
    });
  }
}

export async function DELETE(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token?.value}` },
  });
}

export async function PUT() {
  const res = await fetch('https://data.mongodb-api.com/', {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  return NextResponse.json(data);
}

export async function GET(request: Request) {
  return NextResponse.json({ url: request.url });
}
