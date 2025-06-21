'use client';

import type { ColumnDef } from '@tanstack/react-table';

export type OrderColumn = {
  id: string;
  products: string;
  phone: string;
  address: string;
  totalPrice: string;
  isPaid: boolean;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  { accessorKey: 'products', header: 'Produtos' },
  { accessorKey: 'phone', header: 'Contato' },
  { accessorKey: 'address', header: 'Endereço' },
  { accessorKey: 'totalPrice', header: 'Valor Total' },
  {
    accessorKey: 'isPaid',
    header: 'Pago',
    cell: ({ row }) =>
      row.original.isPaid ? (
        <p className='text-green-500'>sim</p>
      ) : (
        <p className='text-red-500'>não</p>
      ),
  },
];
