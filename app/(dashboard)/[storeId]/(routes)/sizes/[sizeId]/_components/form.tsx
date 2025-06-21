'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { AlertModal } from '@/modals/alert-modal';
import { sizeFormSchema } from '@/schemas/form-schema';

import type { Size } from '@prisma/client';
import type { z } from 'zod';

interface SizeFormProps {
  initialData: Size | null;
}

type SizeFormValues = z.infer<typeof sizeFormSchema>;

export function SizeForm({ initialData }: SizeFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { storeId, sizeId } = useParams();
  const { refresh, push } = useRouter();

  const title = initialData ? 'Editar Tamanho' : 'Criar Tamanho';
  const description = initialData
    ? 'Editar um Tamanho'
    : 'Adicionar novo Tamanho';
  const toastMessage = initialData ? 'Tamanho atualizado!' : 'Tamanho criado!';
  const action = initialData ? 'Salvar mudanças' : 'Criar';

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(sizeFormSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (values: SizeFormValues) => {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(`/api/${storeId}/sizes/${sizeId}`, {
          values,
        });
      } else {
        await axios.post(`/api/${storeId}/sizes`, {
          values,
        });
      }
      push(`/${storeId}/sizes`);
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
      toast.error('Algo deu errado! Tente novamente!');
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${storeId}/sizes/${sizeId}`);
      refresh();
      push(`/${storeId}/sizes`);
      toast.success('Tamanho deletado!');
    } catch (error) {
      console.log(error);

      toast.error('Primeiro remova todos os produtos desse tamanho.');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant={'destructive'}
            size={'icon'}
            disabled={isLoading}
            onClick={() => setIsOpen(true)}>
            <Trash className='size-4' />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Digite o nome'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Digite o tamanho'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' disabled={isLoading} className='ml-auto'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
