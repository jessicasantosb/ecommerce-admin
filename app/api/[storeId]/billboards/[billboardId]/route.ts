import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ billboardId: string }> },
) {
  const { billboardId } = await params;

  try {
    if (!billboardId)
      return new NextResponse('Billboard id is required', { status: 400 });

    const billboard = await prisma.billboard.findUnique({
      where: { id: billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    if (error instanceof Error) console.log('[BILLBOARD_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ billboardId: string; storeId: string }> },
) {
  const { billboardId, storeId } = await params;

  try {
    const { userId } = await auth();
    const body = await req.json();

    const { label, imageUrl } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    for (const value in body.values) {
      if (!value)
        return new NextResponse(`${value} is required`, { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const billboard = await prisma.billboard.updateMany({
      where: { id: billboardId },
      data: { label, imageUrl },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    if (error instanceof Error) console.log('[BILLBOARD_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ billboardId: string; storeId: string }> },
) {
  const { billboardId, storeId } = await params;

  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!billboardId)
      return new NextResponse('Billboard id is required', { status: 400 });

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const billboard = await prisma.billboard.deleteMany({
      where: { id: billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    if (error instanceof Error)
      console.log('[BILLBOARD_DELETE]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
