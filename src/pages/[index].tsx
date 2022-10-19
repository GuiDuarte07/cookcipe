import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Cookcipe</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full w-full flex flex-col content-center items-center">
        <div className="max-w-4xl w-8/12 min-w-fit bg-slate-500 min-h-full">
          <h2 className="font-bold text-lg my-4">Veja algumas receitas</h2>
          <div className="grid grid-cols-2 gap-6">

          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  let page = context?.params?.index;

  if(!page) {
    page = '1';
  }

  if (typeof page !== 'string') {
    page = page[0];
  }

  const skipCount = parseInt(page as string) * 10;



  return {
      props: {
      },
  };
};

export default Home;