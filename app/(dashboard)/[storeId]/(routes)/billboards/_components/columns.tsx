'use client';

import { CellAction } from './cell-action';

import type { ColumnDef } from '@tanstack/react-table';

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  { accessorKey: 'label', header: 'Etiqueta' },
  { accessorKey: 'createdAt', header: 'Data' },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
