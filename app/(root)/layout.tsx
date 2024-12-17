import { getStoreByUserId } from '@/lib/store';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const store = await getStoreByUserId(userId);
  if (store) redirect(`/${store.id}`);

  return <main>{children}</main>;
}
