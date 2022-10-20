import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

type Recipe = {
  image: string | null;
  title: string;
  prepTime: number;
  cookTme: number;
  difficulty: string;
  serves: number;
  id: number;
};

const RecipeCard: React.FC<Recipe> = ({
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
    <button
      type="button"
      onClick={() => {
        router.push(`/recipe/${id}`);
      }}
      className="flex h-full w-full cursor-pointer flex-col content-center items-center shadow-sm"
    >
      <div className="relative h-80 w-full lg:h-60">
        <Image
          layout="fill"
          alt={title}
          src={
            image ?? '/Maple-Cinnamon-Stick-Buns-Square-(with-packaging).webp'
          }
        />
      </div>
      <h2 className="my-2 w-full pl-2 text-left text-xl font-bold">{title}</h2>

      <div className="flex h-fit w-full">
        <div className="md flex h-fit w-full gap-2">
          <div className="flex flex-col">
            <p className="w-full">PREP</p>
            <p className="text-sm text-gray-600">{prepTime}m</p>
          </div>
        </div>

        <div className="flex w-full gap-2">
          <div className="flex flex-col ">
            <p className="w-full">BAKE</p>
            <p className="text-sm text-gray-600">{cookTme}m</p>
          </div>
        </div>

        <div className="flex w-full gap-2">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600">serves {serves}</p>
            <p className="w-full">SERVES</p>
          </div>
        </div>

        <div className="flex w-full gap-2">
          <div className="flex flex-col">
            <p className="w-full">Dificuldade</p>
            <p className="text-sm text-gray-600">{difficulty}</p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default RecipeCard;
