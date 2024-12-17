import prisma from '@/lib/db';

export const getStoresByUserId = async (userId: string) => {
  return await prisma.store.findMany({ where: { userId } });
};

export const getStoreByUserId = async (userId: string) => {
  return await prisma.store.findFirst({ where: { userId } });
};

type getUserStoreByStoreIdProps = { userId: string; storeId: string };

export const getUserStoreByStoreId = async ({
  userId,
  storeId,
}: getUserStoreByStoreIdProps) => {
  return await prisma.store.findFirst({
    where: { userId, id: storeId },
  });
};
