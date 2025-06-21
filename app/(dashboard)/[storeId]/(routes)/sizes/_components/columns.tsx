'use client';

import { CellAction } from './cell-action';

import type { ColumnDef } from '@tanstack/react-table';


export type SizeColumn = {
  id: string;
  name: string;
  value: string
  createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'value', header: 'Tamanho' },
  { accessorKey: 'createdAt', header: 'Data' },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
