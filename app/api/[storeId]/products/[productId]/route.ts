import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    if (!params.productId)
      return new NextResponse('Product id is required', { status: 400 });

    const product = await prisma.product.findUnique({
      where: { id: params.productId },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof Error) console.log('[PRODUCT_GET]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      isFeatured,
      isArchived,
      images,
    } = body.values;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    for (const value in body.values) {
      if (!value)
        return new NextResponse(`${value} is required`, { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse('productId id is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    await prisma.product.update({
      where: { id: params.productId },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof Error) console.log('[PRODUCT_PATCH]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });
    if (!params.productId)
      return new NextResponse('Product id is required', { status: 400 });

    const storeByUserId = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const product = await prisma.product.deleteMany({
      where: { id: params.productId },
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof Error) console.log('[PRODUCT_DELETE]', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
