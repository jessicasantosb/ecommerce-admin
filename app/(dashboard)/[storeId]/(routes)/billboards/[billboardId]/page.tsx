import { getBillboardById } from '@/lib/billboard';

import { BillboardForm } from './_components/form';

export default async function BillboardPage({
  params,
}: {
  params: Promise<{ billboardId: string }>;
}) {
  const { billboardId } = await params;

  const billboard = await getBillboardById(billboardId);

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm initialData={billboard} />
      </div>
    </main>
  );
}
