import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { prisma } from "../server/db/client";
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";

type Recipe = {
  id: number;
  title: string;
  cookTime: number;
  prepTime: number;
  likes: number;
  difficulty: string;
  serves: number;
  image: string | null;
}
const Home: NextPage<{ recipes: Recipe[] }> = ({ recipes }) => {

  return (
    <>
      <Head>
        <title>Cookcipe</title>
        <meta name="description" />
      </Head>
      <div className="h-full w-full flex flex-col content-center items-center">
        <Header/>
        <div className="mt-14 max-w-6xl w-9/12 min-w-fit bg-gray-50 min-h-full">
          <h2 className="font-bold text-lg my-4">Veja algumas receitas</h2>
          <div className="md:grid md:grid-cols-2 gap-6 flex flex-col">
            {console.log(recipes)}
            {recipes.map(recipe => {
              return <RecipeCard 
              cookTme={recipe.cookTime} 
              prepTime={recipe.prepTime} 
              difficulty={recipe.difficulty}
              serves={recipe.serves}
              title={recipe.title}
              image={recipe.image}
              key={recipe.id}
              />
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = context?.params?.index;

  if(!page) 
    page = '0';
  if (typeof page !== 'string')
    page = page[0];

  const skipCount = parseInt(page as string) * 0;

  const recipes: Recipe[] = await prisma.recipe.findMany({
    where: {
      published: true
    },
    skip: skipCount,
    take: 10,
    select: {
      id: true,
      title: true,
      cookTime: true,
      prepTime: true,
      likes: true,
      difficulty: true,
      serves: true,
      image: true,
    }
  });

  console.log(recipes)

  return {
      props: {
        recipes
      },
  };
};

export default Home;