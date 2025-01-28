import prisma from './db';

export const getProductById = async (productId: string) => {
  return await prisma.product.findUnique({
    where: { id: productId },
    include: { images: true },
  });
};

export const getProducts = async (storeId: string) => {
  return await prisma.product.findMany({
    where: { storeId },
    include: { category: true, color: true, size: true },
    orderBy: { createdAt: 'desc' },
  });
};
