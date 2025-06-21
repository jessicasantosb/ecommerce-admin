import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { getColors } from '@/lib/color';

import { ColorClient } from './_components/client';

import type { ColorColumn } from './_components/columns';

interface ColorPageProps {
  params: Promise<{ storeId: string }>;
}

export default async function ColorsPage({ params }: ColorPageProps) {
  const { storeId } = await params;

  const colors = await getColors(storeId);

  const formatedColors: ColorColumn[] = colors.map((item) => ({
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
        <ColorClient data={formatedColors} />
      </div>
    </main>
  );
}
