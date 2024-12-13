import { UserButton } from '@clerk/nextjs';

export default function SetupPage() {
  return (
    <main>
      <h2 className='p-4'>This is a protected route!</h2>
      <UserButton />
    </main>
  );
}
