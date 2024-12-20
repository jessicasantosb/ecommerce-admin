import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const name = body.values.name;

    if (!userId) return new NextResponse('Unauthorized', { status: 401 });
    if (!name) return new NextResponse('Name is required', { status: 400 });

    const store = await prisma.store.create({ data: { name, userId } });

    return NextResponse.json(store);
  } catch (error) {
    if (error instanceof Error) console.log('[STORES_POST]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
