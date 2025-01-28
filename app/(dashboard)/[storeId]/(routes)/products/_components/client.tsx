'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { ApiList } from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { ProductColumn, columns } from './columns';

interface ProductClientProps {
  data: ProductColumn[];
}

export function ProductClient({ data }: ProductClientProps) {
  const { push } = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Produtos (${data.length})`}
          description='Gerencie os produtos para a sua loja.'
        />
        <Button onClick={() => push(`/${storeId}/products/new`)}>
          <Plus className='size-4 mr-2' />
          Adicionar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='label' data={data} columns={columns} />
      <Heading title='API' description='chamadas api para os produtos' />
      <Separator />
      <ApiList entityName='products' entityIdName='productId' />
    </>
  );
}
