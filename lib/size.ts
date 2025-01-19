import prisma from './db';

export const getSizeById = async (sizeId: string) => {
  return await prisma.size.findUnique({
    where: { id: sizeId },
  });
};

export const getSizes = async (storeId: string) => {
  return await prisma.size.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
  });
};
