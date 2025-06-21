import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { getBillboards } from '@/lib/billboard';

import { BillboardClient } from './_components/client';

import type { BillboardColumn } from './_components/columns';

interface BillboardPageProps {
  params: Promise<{ storeId: string }>;
}

export default async function BillboardsPage({ params }: BillboardPageProps) {
  const { storeId } = await params;

  const billboards = await getBillboards(storeId);

  const formatedBillboard: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "dd 'de' MMMM', ' yyyy", {
      locale: ptBR,
    }),
  }));

  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <BillboardClient data={formatedBillboard} />
      </div>
    </main>
  );
}
