'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { BillboardColumn } from './columns';

interface BillboardClientProps {
  data: BillboardColumn[];
}

export function BillboardClient({ data }: BillboardClientProps) {
  const { push } = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Painel (${data.length})`}
          description='Gerencie os painéis para a sua loja.'
        />
        <Button onClick={() => push(`/${storeId}/billboards/new`)}>
          <Plus className='size-4 mr-2' />
          Adicionar
        </Button>
      </div>
      <Separator />
    </>
  );
}
