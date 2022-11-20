import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import { prisma } from '../../server/db/client';
import MyRecipeCard from '../../components/MyRecipeCard';
import Header2 from '../../components/Header2';

type Recipe = {
  id: number;
  title: string;
  cookTime: number;
  prepTime: number;
  likes: number;
  difficulty: string;
  serves: number;
  image: string | null;
};
const MyRecipeList: NextPage<{ recipes: Recipe[] }> = ({ recipes }) => (
  <>
    <Head>
      <title>Minhas receitas</title>
      <meta name="description" />
    </Head>
    <div className="flex h-full w-full flex-col content-center items-center dark:bg-zinc-800 ">
      <Header2 />
      <div className="mt-14 min-h-full w-9/12 max-w-6xl">
        <h2 className="my-4 text-lg font-bold">Minhas receitas</h2>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <MyRecipeCard
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
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  // console.log('recipes:', session.user);

  const recipes: Recipe[] = await prisma.recipe.findMany({
    where: {
      author: {
        email: session.user?.email as string
      }
    },
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

export default MyRecipeList;
