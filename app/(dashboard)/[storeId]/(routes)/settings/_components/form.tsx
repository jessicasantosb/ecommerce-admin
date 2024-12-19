'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { StoreFormField } from '@/components/store-form-field';
import { ApiAlert } from '@/components/ui/api-alert';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useOrigin } from '@/hooks/use-origin';
import { AlertModal } from '@/modals/alert-modal';
import { formSchema } from '@/schemas/form-schema';

interface SettingFormProps {
  initialData: Store;
}

type SettingFormValues = z.infer<typeof formSchema>;

export function SettingsForm({ initialData }: SettingFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const origin = useOrigin();
  const { refresh } = useRouter();

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: SettingFormValues) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, {
        values,
      });
      refresh();
      toast.success('Loja atualizada!');
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
      await axios.delete(`/api/stores/${params.storeId}`);
      refresh();
      toast.success('Loja deletada!');
    } catch (error) {
      console.log(error);

      toast.error('Primeiro remova todas as categorias e produtos.');
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
        <Heading
          title='Configurações da Loja'
          description='Personalize as preferências e opções da sua loja conforme sua necessidade.'
        />
        <Button
          variant={'destructive'}
          size={'icon'}
          disabled={isLoading}
          onClick={() => setIsOpen(true)}>
          <Trash className='size-4' />
        </Button>
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'>
          <div className='grid grid-cols-3 gap-8'>
            <StoreFormField control={form.control} isLoading={isLoading} />
          </div>
          <Button type='submit' disabled={isLoading} className='ml-auto'>
            Salvar mudanças
          </Button>
        </form>
      </Form>

      <Separator />

      <ApiAlert
        title='NEXT_PUBLIC_API_URL'
        description={`${origin}/api/${params.storeId}`}
        variant='public'
      />
    </>
  );
}
