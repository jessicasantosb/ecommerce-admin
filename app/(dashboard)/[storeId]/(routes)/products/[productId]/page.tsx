import { getCategories } from '@/lib/category';
import { getProductById } from '@/lib/product';
import { ProductForm } from './_components/form';
import { getColors } from '@/lib/color';
import { getSizes } from '@/lib/size';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string; storeId: string }>;
}) {
  const { productId, storeId } = await params;

  const product = await getProductById(productId);
  const categories = await getCategories(storeId);
  const colors = await getColors(storeId);
  const sizes = await getSizes(storeId);

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductForm
          initialData={product}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </main>
  );
}
