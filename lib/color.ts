import prisma from './db';

export const getColorById = async (colorId: string) => {
  return await prisma.color.findUnique({
    where: { id: colorId },
  });
};

export const getColors = async (storeId: string) => {
  return await prisma.color.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
  });
};
