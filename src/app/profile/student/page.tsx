import Link from 'next/link';
import { FireIcon } from '@heroicons/react/20/solid';
import * as React from 'react';
//heroicons.dev/

export interface IStudent {}

export default async function Student(props: IStudent) {
  return (
    <div className="bg-indigo-700 p-8 ">
      <p>
        Hello From Student folder{' '}
        <FireIcon className="inline h-6 w-6 text-orange-600" />
      </p>
      <Link className="font-semibold text-green-400" href="/">
        Go Back
      </Link>
    </div>
  );
}
