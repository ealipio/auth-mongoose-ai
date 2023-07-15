"use client";
import * as React from "react";

export interface IErrorProps {}

export default function Error(props: IErrorProps) {
  return (
    <div className="bg-pink-700 p-4 text-white">
      there is an error loading the repositories, please verify the URL
    </div>
  );
}
