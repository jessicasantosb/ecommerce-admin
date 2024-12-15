'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/use-store-modal';

const formSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
});

export function StoreModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.post('/api/stores', { values });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title='Criar loja'
      description='Adicione nova loja e organize seus produtos e categorias'
      isOpen={isOpen}
      onClose={onClose}>
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder='Nome da Loja'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='w-full pt-6 space-x-2 flex items-center justify-end'>
                <Button
                  disabled={isLoading}
                  type='button'
                  variant={'outline'}
                  onClick={onClose}>
                  Cancelar
                </Button>
                <Button disabled={isLoading} type='submit'>
                  Continuar
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className=''>A</div>
      </div>
    </Modal>
  );
}
