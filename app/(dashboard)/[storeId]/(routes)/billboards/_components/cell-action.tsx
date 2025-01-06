'use client';

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { onCopy } from '@/utils/on-copy';

import { BillboardColumn } from './columns';

interface CellActionProps {
  data: BillboardColumn;
}

export function CellAction({ data }: CellActionProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='size-8 p-0'>
          <span className='sr-only'>Abrir menu</span>
          <MoreHorizontal className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className='size-4 mr-2' />
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className='size-4 mr-2' />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className='size-4 mr-2' />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
