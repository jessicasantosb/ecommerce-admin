import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ colorId: string }> },
) {
  const { colorId } = await params;
  try {
    if (!colorId)
      return new NextResponse('Color id is required', { status: 400 });

    const color = await prisma.color.findUnique({
      where: { id: colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    if (error instanceof Error) console.log('[COLOR_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; colorId: string }> },
) {
  const { storeId, colorId } = await params;

  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name, value } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    for (const value in body.values) {
      if (!value)
        return new NextResponse(`${value} is required`, { status: 400 });
    }

    if (!colorId) {
      return new NextResponse('Color id is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const color = await prisma.color.updateMany({
      where: { id: colorId },
      data: { name, value },
    });

    return NextResponse.json(color);
  } catch (error) {
    if (error instanceof Error) console.log('[COLOR_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; colorId: string }> },
) {
  const { storeId, colorId } = await params;

  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!colorId)
      return new NextResponse('Color id is required', { status: 400 });

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const color = await prisma.color.deleteMany({
      where: { id: colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    if (error instanceof Error) console.log('[COLOR_DELETE]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
