import { BillboardClient } from './_components/client';

export default function BillboardPage() {
  return (
    <main className='flex flex-col'>
      <div className='space-y-4 p-8 pt-6 flex-1'>
        <BillboardClient />
      </div>
    </main>
  );
}
