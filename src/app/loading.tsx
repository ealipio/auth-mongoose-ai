import * as React from 'react';

export interface ILoadingProps {}

export default function Loading(props: ILoadingProps) {
  return (
    <div className="bg-green-800 flex items-center justify-center">Loading</div>
  );
}
