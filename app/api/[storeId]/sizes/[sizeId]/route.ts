import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { sizeId: string } },
) {
  try {
    if (!params.sizeId)
      return new NextResponse('Size id is required', { status: 400 });

    const size = await prisma.size.findUnique({
      where: { id: params.sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    if (error instanceof Error) console.log('[SIZE_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name, value } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    for (const value in body.values) {
      if (!value)
        return new NextResponse(`${value} is required`, { status: 400 });
    }

    if (!params.sizeId) {
      return new NextResponse('Size id is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const size = await prisma.size.updateMany({
      where: { id: params.sizeId },
      data: { name, value },
    });

    return NextResponse.json(size);
  } catch (error) {
    if (error instanceof Error) console.log('[SIZE_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!params.sizeId)
      return new NextResponse('Size id is required', { status: 400 });

    const storeByUserId = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const size = await prisma.size.deleteMany({
      where: { id: params.sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    if (error instanceof Error) console.log('[SIZE_DELETE]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
