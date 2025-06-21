'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { ApiList } from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns } from './columns';

import type { ColorColumn} from './columns';

interface ColorClientProps {
  data: ColorColumn[];
}

export function ColorClient({ data }: ColorClientProps) {
  const { push } = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Cores (${data.length})`}
          description='Gerencie as cores para a sua loja.'
        />
        <Button onClick={() => push(`/${storeId}/colors/new`)}>
          <Plus className='color-4 mr-2' />
          Adicionar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' data={data} columns={columns} />
      <Heading title='API' description='chamadas api para as cores' />
      <Separator />
      <ApiList entityName='colors' entityIdName='colorId' />
    </>
  );
}
