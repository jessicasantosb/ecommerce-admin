import prisma from './db';

export const getCategories = async (storeId: string) => {
  return await prisma.category.findMany({
    where: { storeId },
    include: { billboard: true },
    orderBy: { createdAt: 'desc' },
  });
};
