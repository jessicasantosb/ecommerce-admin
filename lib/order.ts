import prisma from './db';

export const getOrders = async (storeId: string) => {
  return await prisma.order.findMany({
    where: { storeId },
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });
};
