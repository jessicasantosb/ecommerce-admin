import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { getCategories } from '@/lib/category';

import { CategoryClient } from './_components/client';
import { CategoryColumn } from './_components/columns';

interface CategoriesPageProps {
  params: Promise<{ storeId: string }>;
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { storeId } = await params;

  const categories = await getCategories(storeId);

  const formatedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "dd 'de' MMMM', ' yyyy", {
      locale: ptBR,
    }),
  }));

  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <CategoryClient data={formatedCategories} />
      </div>
    </main>
  );
}
