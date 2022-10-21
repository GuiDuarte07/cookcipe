import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { HiMoon, HiOutlineMoon } from 'react-icons/hi';

const Header: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const pressInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch('');
    }
  };

  return (
    <div className="absolute flex h-14 w-full justify-center bg-amber-300 dark:bg-yellow-700">
      <div className="flex h-full w-9/12 min-w-fit max-w-6xl justify-between">
        <div className="flex h-full flex-1 items-center">
          <h2 className="w-fit pr-4 text-lg font-bold text-white">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="cursor-pointer"
            >
              Coockcipe :D
            </button>
          </h2>
          <div className="m-auto flex h-full w-fit items-center">
            <input
              placeholder="Pesquise por receitas"
              type="text"
              className="h-3/5 w-96 rounded-l-sm pl-2 text-sm text-gray-600 shadow outline-none dark:text-gray-300"
              value={search}
              id="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                pressInput(e);
              }}
            />
            <button
              type="button"
              className="flex h-3/5 w-8 cursor-pointer items-center justify-center rounded-r-sm bg-slate-50 dark:bg-slate-800"
              onClick={() => {
                setSearch('');
              }}
            >
              <label htmlFor="search" className="">
                <BsSearch />
              </label>
            </button>
          </div>
        </div>

        <div className="flex h-full w-fit">
          <label
            htmlFor="default-toggle"
            className="relative mx-4 inline-flex cursor-pointer items-center"
          >
            <input
              type="checkbox"
              {...(theme === 'dark' && { checked: true })}
              value=""
              id="default-toggle"
              className="peer sr-only"
              onClick={() => changeTheme()}
            />
            <div className="peer relative mf-4 mr-1 h-5 w-11 rounded-full bg-gray-200 after:absolute after:top-[0px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
            <HiMoon className='w-5 h-5' />
          </label>

          {session?.user ? (
            <button
              type="button"
              className="flex h-full w-fit cursor-pointer items-center gap-4"
            >
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  width={24}
                  height={24}
                  alt="Foto do usuário"
                />
              ) : (
                <CgProfile style={{ width: '24px', height: '24px' }} />
              )}
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-200">
                {session.user.name ?? 'Usuário'}
              </p>
            </button>
          ) : (
            <div className="flex h-full w-fit items-center gap-6">
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => router.push('/signup')}
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Cadastra-se
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
