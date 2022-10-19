import type { NextPage } from "next";
import Image from "next/image";
import React from "react";

type Recipe = {
    image?: string;
    title: string;
    prepTime: number;
    cookTme: number;
    difficulty: 'Fácil' | 'Médio' | 'Difícil';
    serves: number;
} 

const Home: React.FC<Recipe> = ({ image, title, prepTime, cookTme, difficulty, serves }) => {
  return (
      <div className="h-full w-fit flex flex-col content-center items-center shadow-sm">
        <Image className="h-80" layout="fill" 
        src={image ?? './Maple-Cinnamon-Stick-Buns-Square-(with-packaging).webp'} />
        <h2 className="text-xl font-bold">{title}</h2>

        <div className="w-full h-7 flex gap-2">
            <div className="flex flex-col w-7 h-10">
							<p className="h-4/6 w-full">PREP</p>
							<p className="text-gray-600 text-sm">{prepTime}m</p>
						</div>
        </div>

				<div className="w-full h-7 flex gap-2">
            <div className="flex flex-col w-7 h-10">
							<p className="h-4/6 w-full">BAKE</p>
							<p className="text-gray-600 text-sm">{cookTme}m</p>
						</div>
        </div>

				<div className="w-full h-7 flex gap-2">
            <div className="flex flex-col w-7 h-10">
							<p className="h-4/6 w-full">SERVES</p>
							<p className="text-gray-600 text-sm">serves {serves}</p>
						</div>
        </div>

				<div className="w-full h-7 flex gap-2">
            <div className="flex flex-col w-7 h-10">
							<p className="h-4/6 w-full">Dificuldade</p>
							<p className="text-gray-600 text-sm">{difficulty}</p>
						</div>
        </div>
      </div>
  );
};

export default Home;