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
import { colorFormSchema } from '@/schemas/form-schema';

import type { Color } from '@prisma/client';
import type { z } from 'zod';

interface ColorFormProps {
  initialData: Color | null;
}

type ColorFormValues = z.infer<typeof colorFormSchema>;

export function ColorForm({ initialData }: ColorFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { storeId, colorId } = useParams();
  const { refresh, push } = useRouter();

  const title = initialData ? 'Editar Cor' : 'Criar Cor';
  const description = initialData ? 'Editar uma Cor' : 'Adicionar nova Cor';
  const toastMessage = initialData ? 'Cor atualizada!' : 'Cor criada!';
  const action = initialData ? 'Salvar mudanças' : 'Criar';

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorFormSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (values: ColorFormValues) => {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(`/api/${storeId}/colors/${colorId}`, {
          values,
        });
      } else {
        await axios.post(`/api/${storeId}/colors`, {
          values,
        });
      }
      push(`/${storeId}/colors`);
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
      await axios.delete(`/api/${storeId}/colors/${colorId}`);
      refresh();
      push(`/${storeId}/colors`);
      toast.success('Cor deletada!');
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
                  <FormLabel>Cor</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-x-4'>
                      <Input
                        disabled={isLoading}
                        placeholder='Digite a cor em código hexadecimal'
                        {...field}
                      />
                      <div
                        className='p-4 border rounded-full'
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
