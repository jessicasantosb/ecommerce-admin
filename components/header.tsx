import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { Navbar } from '@/components/navbar';
import { StoreSwitcher } from '@/components/store-switcher';
import { getStoresByUserId } from '@/lib/store';
import { ThemeToggle } from './ui/theme-toggle';

export async function Header() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const stores = await getStoresByUserId(userId);

  return (
    <header className='h-16 flex items-center gap-2 px-4 mb-1 border-b'>
      <StoreSwitcher items={stores} />
      <Navbar />
      <div className='ml-auto flex items-center space-x-4'>
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  );
}
