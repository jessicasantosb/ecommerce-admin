import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { getUserStoreByStoreId } from '@/lib/store';
import { SettingsForm } from './_components/form';

interface SettingsPageProps {
  params: { storeId: string };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const store = await getUserStoreByStoreId({
    userId,
    storeId: params.storeId,
  });
  if (!store) redirect('/');

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={store} />
      </div>
    </main>
  );
}
