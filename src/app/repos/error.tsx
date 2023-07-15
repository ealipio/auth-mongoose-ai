'use client';
import * as React from 'react';

export interface IErrorProps {}

export default function Error(props: IErrorProps) {
  return (
    <div className="p-4 bg-pink-700 text-white">
      there is an error loading the repositories, please verify the URL
    </div>
  );
}
