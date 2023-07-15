import * as React from 'react';

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div className="bg-slate-600 text-white border-2 m-12 p-8">
      <p>Announcements: Tomorrow is a holiday YAY!</p>
      <div>{children}</div>
    </div>
  );
}
