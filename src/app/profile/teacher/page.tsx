import Link from "next/link";
import * as React from "react";

export interface IStudent {}

export default function Teacher(props: IStudent) {
  return (
    <div className="h-80 bg-orange-400">
      <p>Hello From Teacher folder</p>
      <Link className="font-semibold text-green-400" href="/">
        Go Back
      </Link>
    </div>
  );
}
