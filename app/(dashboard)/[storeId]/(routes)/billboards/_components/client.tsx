'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export function BillboardClient() {
  const { push } = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Painel (0)'
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
