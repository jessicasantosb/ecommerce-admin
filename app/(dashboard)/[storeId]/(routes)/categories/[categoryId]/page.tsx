import { getBillboards } from '@/lib/billboard';
import { getCategoryById } from '@/lib/category';

import { CategoryForm } from './_components/form';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string; storeId: string }>;
}) {
  const { categoryId, storeId } = await params;

  const category = await getCategoryById(categoryId);
  const billboards = await getBillboards(storeId);

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </main>
  );
}
