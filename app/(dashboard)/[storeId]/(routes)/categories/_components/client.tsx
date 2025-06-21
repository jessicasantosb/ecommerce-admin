'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { ApiList } from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns } from './columns';

import type { CategoryColumn} from './columns';

interface CategoryClientProps {
  data: CategoryColumn[];
}

export function CategoryClient({ data }: CategoryClientProps) {
  const { push } = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Categorias'
          description='Gerencie as categorias para a sua loja.'
        />
        <Button onClick={() => push(`/${storeId}/categories/new`)}>
          <Plus className='size-4 mr-2' />
          Adicionar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' data={data} columns={columns} />
      <Heading title='API' description='chamadas api para as categorias' />
      <Separator />
      <ApiList entityName='categories' entityIdName='categoryId' />
    </>
  );
}
