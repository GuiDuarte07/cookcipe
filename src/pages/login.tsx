import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trpc } from '../utils/trpc';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const loginWithCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn('credentials', { email, password, redirect: false }).then((res) => {
      if (res?.ok) {
        router.push('/');
      } else {
        console.log(res?.error);
        toast.error('Falha ao realizar o login'),
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
          };
      }
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-start">
      <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 md:w-1/2">
        <div className="flex w-7/12 flex-col items-start justify-center md:w-5/12">
          <h2 className="my-4 text-2xl font-bold text-gray-900">
            Bem-vindo novamente!
          </h2>
          <h3 className="text-sm font-medium text-gray-500">
            Faça seu login para continuar acessando nosso site
          </h3>
        </div>

        <form
          onSubmit={(e) => loginWithCredentials(e)}
          className="flex h-fit w-7/12 flex-col md:w-5/12"
        >
          <label htmlFor="email" className="mb-1 mt-6 text-sm text-gray-600">
            E-mail
          </label>
          <input
            placeholder="Insira seu e-mail"
            type="text"
            name="email"
            id="email"
            className="h-10 w-full rounded-md border border-gray-300 pl-2 shadow-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label
            htmlFor="password"
            className="mb-1 mt-6 text-sm text-gray-600"
          >
            Senha
          </label>
          <input
            placeholder="********"
            type="password"
            name="password"
            id="password"
            className="h-10 w-full rounded-md border border-gray-300 pl-2 shadow-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="mt-6 h-10 w-full rounded-md bg-blue-700 text-sm font-bold text-white shadow-md md:text-base"
            type="submit"
          >
            Logar
          </button>
          <button
            className="mt-6 flex h-10 w-full items-center justify-center rounded-md text-sm font-bold text-white shadow-md md:text-base"
            type="submit"
          >
            <div className="justify flex items-center">
              <FcGoogle className="mx-2" />
              <p className="text-gray-700">Logar com o Google</p>
            </div>
          </button>

          <p className="mt-8 text-sm mx-auto text-gray-500">
            Não tem uma conta?{' '}
            <a
              className="cursor-pointer text-blue-600"
              onClick={() => router.push('/signup')}
            >
              Clique aqui
            </a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
