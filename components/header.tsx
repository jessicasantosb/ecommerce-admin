import { UserButton } from '@clerk/nextjs';

import { Navbar } from '@/components/navbar';

export function Header() {
  return (
    <header className='h-16 flex items-center gap-2 px-4 mb-1 border-b'>
      <div>store switcher</div>
      <Navbar />
      <div className='ml-auto flex items-center space-x-4'>
        <UserButton />
      </div>
    </header>
  );
}
