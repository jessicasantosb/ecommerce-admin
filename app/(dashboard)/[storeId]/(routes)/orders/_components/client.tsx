'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { OrderColumn, columns } from './columns';

interface OrderClientProps {
  data: OrderColumn[];
}

export function OrderClient({ data }: OrderClientProps) {
  return (
    <>
      <Heading
        title={`Pedidos (${data.length})`}
        description='Gerencie os pedidos da sua loja.'
      />
      <Separator />
      <DataTable searchKey='products' data={data} columns={columns} />
    </>
  );
}
