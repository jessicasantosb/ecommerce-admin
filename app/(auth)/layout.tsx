import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main className='w-full h-svh grid place-items-center'>{children}</main>;
}
