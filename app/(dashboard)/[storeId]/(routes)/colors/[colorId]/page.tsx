import { getColorById } from '@/lib/color';
import { ColorForm } from './_components/form';

export default async function ColorPage({
  params,
}: {
  params: Promise<{ colorId: string }>;
}) {
  const { colorId } = await params;

  const color = await getColorById(colorId);

  return (
    <main className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorForm initialData={color} />
      </div>
    </main>
  );
}
