import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { getSizes } from '@/lib/size';

import { SizeClient } from './_components/client';
import { SizeColumn } from './_components/columns';

interface SizePageProps {
  params: Promise<{ storeId: string }>;
}

export default async function SizesPage({ params }: SizePageProps) {
  const { storeId } = await params;

  const sizes = await getSizes(storeId);

  const formatedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "dd 'de' MMMM', ' yyyy", {
      locale: ptBR,
    }),
  }));

  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <SizeClient data={formatedSizes} />
      </div>
    </main>
  );
}
