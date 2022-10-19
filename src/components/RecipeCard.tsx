import Image from "next/image";
import React from "react";

type Recipe = {
    image: string | null;
    title: string;
    prepTime: number;
    cookTme: number;
    difficulty: string;
    serves: number;
} 

const RecipeCard: React.FC<Recipe> = ({ image, title, prepTime, cookTme, difficulty, serves }) => {
  return (
      <div className="h-full w-full flex flex-col content-center items-center shadow-sm">
        <div className="h-80 w-full relative">
          <Image layout="fill"  alt={title}
          src={image ?? '/Maple-Cinnamon-Stick-Buns-Square-(with-packaging).webp'} />
        </div>
        <h2 className="w-full text-xl font-bold my-2 text-left pl-2">{title}</h2>

        <div className="flex w-full h-fit">
          <div className="w-full h-fit flex gap-2 md">
              <div className="flex flex-col">
                <p className="w-full">PREP</p>
                <p className="text-gray-600 text-sm">{prepTime}m</p>
              </div>
          </div>

          <div className="w-full flex gap-2">
              <div className="flex flex-col ">
                <p className="w-full">BAKE</p>
                <p className="text-gray-600 text-sm">{cookTme}m</p>
              </div>
          </div>

          <div className="w-full flex gap-2">
              <div className="flex flex-col">
                <p className="w-full">SERVES</p>
                <p className="text-gray-600 text-sm">serves {serves}</p>
              </div>
          </div>

          <div className="w-full flex gap-2">
              <div className="flex flex-col">
                <p className="w-full">Dificuldade</p>
                <p className="text-gray-600 text-sm">{difficulty}</p>
              </div>
          </div>
        </div>
      </div>
  );
};

export default RecipeCard;