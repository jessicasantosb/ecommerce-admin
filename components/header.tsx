import { UserButton } from '@clerk/nextjs';

import { Navbar } from '@/components/navbar';
import { StoreSwitcher } from '@/components/store-switcher';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function Header() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  if (!userId) redirect('/sign-in');
  const stores = await prisma.store.findMany({ where: { userId } });

  return (
    <header className='h-16 flex items-center gap-2 px-4 mb-1 border-b'>
      <StoreSwitcher items={stores} />
      <Navbar />
      <div className='ml-auto flex items-center space-x-4'>
        <UserButton />
      </div>
    </header>
  );
}
