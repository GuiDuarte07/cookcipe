import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";


const Header: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  console.log(session);
  
  const pressInput =(e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch("");
    }
  }

  return (
    <div className="h-14 absolute w-full flex justify-center bg-amber-500">
      <div className="flex max-w-6xl w-9/12 min-w-fit h-full justify-between">
        <div className="h-full w-fit flex justify-center items-center">
          <h2 className="w-fit pr-4 font-bold text-lg text-white">Coockcipe :D</h2>
          <div className="h-full w-fit flex items-center">
            <input
            placeholder="Pesquise por receitas" 
            type="text" 
            className="text-sm text-gray-500 shadow outline-none pl-2 ml-12 h-3/5 w-96 rounded-l-sm" 
            value={search}
            id={search}
            onChange={(e) => {setSearch(e.target.value)}}
            onKeyDown={(e) => {pressInput(e)}}
            />
            <label 
            htmlFor="search" 
            onClick={() => {setSearch("")}}
            className="cursor-pointer h-3/5 w-8 rounded-r-sm bg-slate-50 flex justify-center items-center">
              <BsSearch/>
            </label>
          </div>
        </div>

        {session?.user ? 
          <div className="h-full w-fit flex items-center gap-6">
            {session.user.image ?
              <Image src={session.user.image} width={16} height={16} alt="Foto do usuário" />
              :
              <CgProfile/>
            }
          </div>
          :
          <div className="h-full w-fit flex items-center gap-6">
            <button onClick={() => router.push('/login')} className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Entrar</button>
            <button onClick={() => router.push('/signup')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Cadastra-se</button>
          </div> 
        }
      </div>
    </div>
  );
};

export default Header;