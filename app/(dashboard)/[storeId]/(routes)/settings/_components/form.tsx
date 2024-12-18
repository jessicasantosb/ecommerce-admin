'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { StoreFormField } from '@/components/store.form-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { formSchema } from '@/schemas/form-schema';

interface SettingFormProps {
  initialData: Store;
}

type SettingFormValues = z.infer<typeof formSchema>;

export function SettingsForm({ initialData }: SettingFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = (values: SettingFormValues) => {
    console.log(values);
  };

  return (
    <>
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
    </>
  );
}
