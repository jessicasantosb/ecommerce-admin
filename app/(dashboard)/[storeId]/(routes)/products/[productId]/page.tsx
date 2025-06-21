import { getCategories } from '@/lib/category';
import { getColors } from '@/lib/color';
import { getProductById } from '@/lib/product';
import { getSizes } from '@/lib/size';

import { ProductForm } from './_components/form';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string; storeId: string }>;
}) {
  const { productId, storeId } = await params;

  const productData = await getProductById(productId);
  const categories = await getCategories(storeId);
  const colors = await getColors(storeId);
  const sizes = await getSizes(storeId);

  const product = productData
    ? {
        ...productData,
        price: Number(productData.price),
        id: productData.id ?? '',
        storeId: productData.storeId ?? '',
        categoryId: productData.categoryId ?? '',
        name: productData.name ?? '',
        sizeId: productData.sizeId ?? '',
        colorId: productData.colorId ?? '',
        isFeatured: productData.isFeatured ?? false,
        isArchived: productData.isArchived ?? false,
        createdAt: productData.createdAt ?? new Date(),
        updatedAt: productData.updatedAt ?? new Date(),
      }
    : null;

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
