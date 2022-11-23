import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { BsSearch, BsFillPersonLinesFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { GrLogout } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
import { HiMoon } from 'react-icons/hi';
import Link from 'next/link';
import useHandlePopup from '../hooks/useHandlePopUp';
import BallonPopup from './BallonPopup';

const Header2: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const profileRef = useRef<HTMLDivElement>(null);
  const [profilePopup, setProfilePopup] = useState(false);

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const pressInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch('');
    }
  };

  return (
    <nav className="flex w-full justify-center border-gray-400 bg-gray-100 dark:bg-gray-900">
      <div className="flex h-full w-9/12 min-w-fit max-w-6xl items-center px-2 py-1 sm:px-6">
        <div className="container mx-auto flex  items-center justify-between">
          <Link href="/sd" className="flex items-center">
            <div className="">
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Cookcipe :D
              </span>
            </div>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-lg border bg-inherit   p-4  md:mt-0 md:flex-row md:space-x-8 md:border-0  md:text-sm md:font-medium ">
              <li className="block border-b-2 py-2 pl-3 pr-4 text-black dark:text-white md:bg-transparent md:p-0">
                <Link href="/" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="block border-b-2 py-2 pl-3 pr-4 text-black dark:text-white md:bg-transparent md:p-0">
                <Link href="/">About</Link>
              </li>
              <li className="block border-b-2 py-2 pl-3 pr-4 text-black dark:text-white md:bg-transparent md:p-0">
                <Link href="/">Services</Link>
              </li>
              <li className="block border-b-2 py-2 pl-3 pr-4 text-black dark:text-white md:bg-transparent md:p-0">
                <Link href="/">Pricing</Link>
              </li>
            </ul>
          </div>

          {/* Search-bar ----------------- */}
          <div className="w-5/12">
            <form>
              <label
                htmlFor="default-search"
                className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Search
              </label>
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-9/12 rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Search Mockups, Logos..."
                  required
                />
                <button
                  type="submit"
                  className="ml-2 rounded-lg bg-blue-700 px-3 py-3 text-sm font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Theme toggle */}
        <label
          htmlFor="default-toggle"
          className="relative ml-4 mr-2 inline-flex cursor-pointer items-center"
        >
          <input
            type="checkbox"
            {...(theme === 'dark' && { defaultChecked: true })}
            value=""
            id="default-toggle"
            className="peer sr-only"
            onClick={() => changeTheme()}
          />
          <div className="mf-4 peer relative mr-1 h-5 w-11 rounded-full bg-gray-200 after:absolute after:top-[0px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
          <HiMoon className="h-5 w-5" />
        </label>

        {/* login/register or profile image */}
        {session?.user ? (
          <div className="relative">
            <button
              ref={profileRef}
              type="button"
              className="relative flex h-7 w-8 cursor-pointer items-center justify-center"
              onClick={() => setProfilePopup((prev) => !prev)}
            >
              <Image
                layout="fill"
                alt="imagem de perfil"
                src="/profileIcon.png"
              />
            </button>
            {profilePopup && (
              <BallonPopup
                setFalse={() => setProfilePopup(false)}
                popUpSide="right"
                ref={profileRef}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-start border-b-[1px] !border-b-gray-400 px-6 py-2 pl-3 hover:bg-slate-300"
                >
                  <BsFillPersonLinesFill />
                  <p className="pl-2 text-sm text-gray-700 dark:text-white">
                    Ver perfil
                  </p>
                </button>

                <button
                  onClick={() => router.push('/recipes')}
                  type="button"
                  className="flex w-full items-center justify-start border-b-[1px] !border-b-gray-400 px-6 py-2 pl-3 hover:bg-slate-300"
                >
                  <FiEdit />
                  <p className="pl-2 text-sm text-gray-700 dark:text-white">
                    Gerenciar
                  </p>
                </button>

                <button
                  onClick={() => signOut()}
                  type="button"
                  className="flex w-full items-center justify-start px-6 py-2 pl-3 hover:bg-slate-300"
                >
                  <GrLogout />
                  <p className="pl-2 text-sm text-gray-700 dark:text-white">
                    Sair
                  </p>
                </button>
              </BallonPopup>
            )}
          </div>
        ) : (
          <div className="my-5 flex w-fit rounded-xl border shadow-sm">
            <button
              type="button"
              className="m-0 rounded-l-xl bg-blue-600 px-3 py-2 text-sm text-white transition hover:bg-blue-800 focus:ring-blue-800 "
            >
              <Link href="/login">Entrar</Link>
            </button>
            <button
              type="button"
              className="rounded-r-xl bg-neutral-50 px-3 py-2 text-sm text-black transition hover:bg-neutral-100 dark:bg-slate-300"
            >
              <Link href="/signup">Registrar</Link>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header2;
