'use client';

import { Store } from '@prisma/client';
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useStoreModal } from '@/hooks/use-store-modal';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export function StoreSwitcher({ className, items = [] }: StoreSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const currentStore = formattedItems.find(
    ({ value }) => value === params.storeId,
  );

  const onStoreSelect = (store: { label: string; value: string }) => {
    setIsOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          size={'sm'}
          role='combobox'
          aria-expanded={isOpen}
          aria-label='selecione uma loja'
          className={cn('w-[200px] justify-between', className)}>
          <StoreIcon className='size-4 mr-2' />
          {currentStore?.label}
          <ChevronsUpDown className='size-4 ml-auto shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Command>
          <CommandList>
            <CommandInput placeholder='Pesquisar loja...' />
            <CommandEmpty>Nenhuma loja encontrada</CommandEmpty>
            <CommandGroup heading='Lojas'>
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className='text-sm'>
                  <StoreIcon className='size-4 mr-2' />
                  {store.label}
                  <Check
                    className={cn(
                      'size-4 ml-auto',
                      currentStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsOpen(false);
                  storeModal.onOpen();
                }}>
                <PlusCircle className='size-5 mr-2' />
                Criar Loja
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
