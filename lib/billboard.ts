import prisma from './db';

export const getBillboardById = async (billboardId: string) => {
  return await prisma.billboard.findUnique({
    where: { id: billboardId },
  });
};
