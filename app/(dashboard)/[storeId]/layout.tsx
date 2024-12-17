import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { Header } from '@/components/header';
import { getUserStoreByStoreId } from '@/lib/store';

interface Props {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function DashboardLayout({ children, params }: Props) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const store = await getUserStoreByStoreId({
    userId,
    storeId: params.storeId,
  });
  if (!store) redirect('/');

  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
