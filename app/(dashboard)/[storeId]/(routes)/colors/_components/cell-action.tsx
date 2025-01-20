'use client';

import axios from 'axios';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertModal } from '@/modals/alert-modal';
import { onCopy } from '@/utils/on-copy';

import { ColorColumn } from './columns';

interface CellActionProps {
  data: ColorColumn;
}

export function CellAction({ data }: CellActionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { push, refresh } = useRouter();
  const { storeId } = useParams();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${storeId}/colors/${data.id}`);
      refresh();
      toast.success('Tamanho deletado!');
    } catch (error) {
      console.log(error);

      toast.error('Primeiro remova todos os produtos dessa cor.');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='color-8 p-0'>
            <span className='sr-only'>Abrir menu</span>
            <MoreHorizontal className='color-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className='color-4 mr-2' />
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => push(`/${storeId}/colors/${data.id}`)}>
            <Edit className='color-4 mr-2' />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className='color-4 mr-2' />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
