import prisma from './db';

export const getBillboardById = async (billboardId: string) => {
  return await prisma.billboard.findUnique({
    where: { id: billboardId },
  });
};

export const getBillboards = async (storeId: string) => {
  return await prisma.billboard.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
  });
};
