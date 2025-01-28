import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { getProducts } from '@/lib/product';

import { priceFormatter } from '@/lib/utils';
import { ProductClient } from './_components/client';
import { ProductColumn } from './_components/columns';

interface ProductPageProps {
  params: Promise<{ storeId: string }>;
}

export default async function ProductsPage({ params }: ProductPageProps) {
  const { storeId } = await params;

  const products = await getProducts(storeId);

  const formatedProduct: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: priceFormatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "dd 'de' MMMM', ' yyyy", {
      locale: ptBR,
    }),
  }));

  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <ProductClient data={formatedProduct} />
      </div>
    </main>
  );
}
