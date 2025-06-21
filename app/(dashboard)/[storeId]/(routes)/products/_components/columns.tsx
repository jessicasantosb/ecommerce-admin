'use client';


import { ColorBadge } from '@/components/color-badge';

import { CellAction } from './cell-action';

import type { ColumnDef } from '@tanstack/react-table';

export type ProductColumn = {
  id: string;
  name: string;
  isFeatured: boolean;
  isArchived: boolean;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  { accessorKey: 'name', header: 'Produto' },
  {
    accessorKey: 'isFeatured',
    header: 'Em destaque',
    cell: ({ row }) => <p>{row.original.isFeatured ? 'sim' : 'não'}</p>,
  },
  {
    accessorKey: 'isArchived',
    header: 'Arquivado',
    cell: ({ row }) => <p>{row.original.isArchived ? 'sim' : 'não'}</p>,
  },
  { accessorKey: 'price', header: 'Preço' },
  { accessorKey: 'category', header: 'Categoria' },
  { accessorKey: 'size', header: 'Tamanho' },
  {
    accessorKey: 'color',
    header: 'Cor',
    cell: ({ row }) => <ColorBadge value={row.original.color} />,
  },
  { accessorKey: 'createdAt', header: 'Data' },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
