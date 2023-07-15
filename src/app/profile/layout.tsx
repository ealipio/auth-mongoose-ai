import * as React from "react";

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div className="m-12 border-2 bg-slate-600 p-8 text-white">
      <p>Announcements: Tomorrow is a holiday YAY!</p>
      <div>{children}</div>
    </div>
  );
}
