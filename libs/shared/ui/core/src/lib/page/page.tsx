import {ReactNode} from 'react';

/* eslint-disable-next-line */
export interface PageProps {
  children?: ReactNode;
  className?: string;
}

export function Page({ children, className = '' }: PageProps) {
  return (
    <div className={`flex flex-col w-screen h-screen p-4 ${className}`}>
      {children}
    </div>
  );
}

export default Page;
