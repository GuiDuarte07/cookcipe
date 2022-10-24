import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { RiKnifeFill, RiEditBoxFill } from 'react-icons/ri';
import { GiCookingPot } from 'react-icons/gi';
import { BsFillPeopleFill, BsFillArrowUpRightSquareFill } from 'react-icons/bs';
import Link from 'next/link';

type Recipe = {
  image: string | null;
  title: string;
  prepTime: number;
  cookTme: number;
  difficulty: string;
  serves: number;
  id: number;
};

const MyRecipeCard: React.FC<Recipe> = ({
  image,
  title,
  prepTime,
  cookTme,
  difficulty,
  serves,
  id
}) => {
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col content-center items-center shadow-sm">
      <div className="relative h-60 w-full lg:h-60">
        <Image
          className="rounded-md"
          layout="fill"
          alt={title}
          src={
            image ?? '/Maple-Cinnamon-Stick-Buns-Square-(with-packaging).webp'
          }
        />
      </div>
      <h2 className="my-2 w-full text-left text-xl font-bold">{title}</h2>

      <div className="flex h-fit w-full justify-between">
        <div className="flex items-center gap-2">
          <p className="inline-block text-sm text-gray-600">{prepTime}m</p>
          <RiKnifeFill />
        </div>

        <div className="flex items-center gap-2">
          <p className="inline-block text-sm text-gray-600">{cookTme}m</p>
          <GiCookingPot />
        </div>

        <div className="flex items-center gap-2">
          <p className="inline text-sm text-gray-600">{serves}</p>
          <BsFillPeopleFill />
        </div>

        <div className="flex items-center gap-2">
          <p className="inline-block text-sm text-gray-600">Fácil</p>
          <div className="inline-flex h-3 w-fit items-end gap-0.5">
            <div className="h-2/6 w-1 bg-green-500" />
            <div className="h-4/6 w-1 bg-slate-600" />
            <div className="h-full w-1 bg-slate-600" />
          </div>
        </div>
      </div>
      <div className="mt-2 flex w-full">
        <Link href={`/recipe/${id}`} className="w-fit">
          <div className="flex cursor-pointer items-center gap-2 rounded bg-indigo-800 p-2">
            <BsFillArrowUpRightSquareFill className="fill-white" />
            <p className="text-sm text-white">Ir para</p>
          </div>
        </Link>
        <Link href={`/recipe/create/${id}`} className="w-fit">
          <div className="mx-2 ml-6 flex cursor-pointer items-center gap-2 rounded bg-blue-500 p-2">
            <RiEditBoxFill className="fill-white" />
            <p className="text-sm text-white">Editar</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyRecipeCard;
