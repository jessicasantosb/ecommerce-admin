import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { label, imageUrl } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!label) return new NextResponse('Label is required', { status: 400 });
    if (!imageUrl) {
      return new NextResponse('Image url is required', { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const billboard = await prisma.billboard.create({
      data: { label, imageUrl, storeId: params.storeId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    if (error instanceof Error) console.log('[BILLBOARDS_POST]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
