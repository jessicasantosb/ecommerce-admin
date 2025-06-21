'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { ApiList } from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns } from './columns';

import type { SizeColumn} from './columns';

interface SizeClientProps {
  data: SizeColumn[];
}

export function SizeClient({ data }: SizeClientProps) {
  const { push } = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Tamanhos (${data.length})`}
          description='Gerencie os tamanhos para a sua loja.'
        />
        <Button onClick={() => push(`/${storeId}/sizes/new`)}>
          <Plus className='size-4 mr-2' />
          Adicionar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' data={data} columns={columns} />
      <Heading title='API' description='chamadas api para os tamanhos' />
      <Separator />
      <ApiList entityName='sizes' entityIdName='sizeId' />
    </>
  );
}
