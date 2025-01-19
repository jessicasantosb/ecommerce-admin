import { getSizeById } from '@/lib/size';
import { SizeForm } from './_components/form';

export default async function SizePage({
  params,
}: {
  params: Promise<{ sizeId: string }>;
}) {
  const { sizeId } = await params;

  const size = await getSizeById(sizeId);

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeForm initialData={size} />
      </div>
    </main>
  );
}
