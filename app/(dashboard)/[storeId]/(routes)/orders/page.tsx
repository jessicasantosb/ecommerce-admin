import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { getOrders } from '@/lib/order';

import { priceFormatter } from '@/lib/utils';
import { OrderClient } from './_components/client';
import { OrderColumn } from './_components/columns';

interface OrderPageProps {
  params: Promise<{ storeId: string }>;
}

export default async function OrdersPage({ params }: OrderPageProps) {
  const { storeId } = await params;

  const orders = await getOrders(storeId);

  const formatedOrder: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    phone: item.phone,
    address: item.address,
    totalPrice: priceFormatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0),
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "dd 'de' MMMM', ' yyyy", {
      locale: ptBR,
    }),
  }));

  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <OrderClient data={formatedOrder} />
      </div>
    </main>
  );
}
