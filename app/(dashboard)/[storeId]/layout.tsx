import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import { Header } from '@/components/header';
import prisma from '@/lib/db';

interface Props {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function DashboardLayout({ children, params }: Props) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const store = await prisma.store.findFirst({
    where: { id: params.storeId, userId },
  });
  if (!store) redirect('/');

  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
