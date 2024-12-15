import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

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
      <nav>This will be a navbar</nav>
      {children}
    </main>
  );
}
