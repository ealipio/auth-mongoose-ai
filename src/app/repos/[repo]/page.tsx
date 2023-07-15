import { Suspense } from "react";
import Image from "next/image";

export interface IRepoProps {
  params: string;
  searchParams: any;
}

const fetchImage = async () => {
  const response = await fetch(process.env.RANDOM_DOG as string, {
    cache: "no-store",
  });
  const image = await response.json();
  return image;
};

export default async function Repo({ params, searchParams }: IRepoProps) {
  const { message: imageSrc } = await fetchImage();
  return (
    <div>
      <Suspense fallback={<div className="text-black">is loading</div>}>
        <div className="relative h-96 w-80 object-contain">
          <Image src={imageSrc} alt="dog" fill />
        </div>
      </Suspense>
    </div>
  );
}
