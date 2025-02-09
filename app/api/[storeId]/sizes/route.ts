import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> },
) {
  const { storeId } = await params;

  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name, value } = body.values;

    console.log('name, value', name, value);

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    for (const value in body.values) {
      if (!value)
        return new NextResponse(`${value} is required`, { status: 400 });
    }

    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const size = await prisma.size.create({
      data: { name, value, storeId: storeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    if (error instanceof Error) console.log('[SIZES_POST]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> },
) {
  const { storeId } = await params;
  
  try {
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const sizes = await prisma.size.findMany({
      where: { storeId: storeId },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    if (error instanceof Error) console.log('[SIZES__GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
