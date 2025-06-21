
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

import type { Control } from 'react-hook-form';

interface StoreFormFieldProps {
  control: Control<
    {
      name: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
  isLoading: boolean;
}

export function StoreFormField({ control, isLoading }: StoreFormFieldProps) {
  return (
    <FormField
      control={control}
      name='name'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nome da loja</FormLabel>
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
  );
}
