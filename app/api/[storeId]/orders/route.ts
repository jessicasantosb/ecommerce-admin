import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const orders = await prisma.order.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(orders);
  } catch (error) {
    if (error instanceof Error) console.log('[ORDERS_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
