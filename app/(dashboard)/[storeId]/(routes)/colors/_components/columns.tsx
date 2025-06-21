'use client';


import { ColorBadge } from '@/components/color-badge';

import { CellAction } from './cell-action';

import type { ColumnDef } from '@tanstack/react-table';

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  { accessorKey: 'name', header: 'Nome' },
  {
    accessorKey: 'value',
    header: 'Cor',
    cell: ({ row }) => <ColorBadge value={row.original.value} />,
  },
  { accessorKey: 'createdAt', header: 'Data' },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
