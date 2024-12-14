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
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
});

export function StoreModal() {
  const { isOpen, onClose } = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                      <Input placeholder='Nome da Loja' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='w-full pt-6 space-x-2 flex items-center justify-end'>
                <Button type='button' variant={'outline'} onClick={onClose}>
                  Cancelar
                </Button>
                <Button type='submit'>
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
