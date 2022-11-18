import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { prisma } from '../server/db/client';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import Header2 from '../components/Header2';

export type RecipeHomeList = {
  id: number;
  title: string;
  cookTime: number;
  prepTime: number;
  likes: number;
  difficulty: string;
  serves: number;
  image: string | null;
};
const Home: NextPage<{ recipes: RecipeHomeList[] }> = ({ recipes }) => (
  <>
    <Head>
      <title>Cookcipe</title>
      <meta name="description" />
    </Head>
    <div className="flex h-full w-full flex-col content-center items-center dark:bg-zinc-800 ">
      <Header2 />
      <div className="mt-14 min-h-full w-9/12 max-w-6xl">
        <h2 className="my-4 text-lg font-bold">Veja algumas receitas</h2>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard
              cookTme={recipe.cookTime}
              prepTime={recipe.prepTime}
              difficulty={recipe.difficulty}
              serves={recipe.serves}
              title={recipe.title}
              image={recipe.image}
              key={recipe.id}
              id={recipe.id}
            />
          ))}
        </div>
      </div>
    </div>
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = context?.params?.index;

  if (!page) page = '0';
  if (typeof page !== 'string') [page] = page;

  const skipCount = parseInt(page as string, 10) * 0;

  const recipes: RecipeHomeList[] = await prisma.recipe.findMany({
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
      image: true
    }
  });

  return {
    props: {
      recipes
    }
  };
};

export default Home;
