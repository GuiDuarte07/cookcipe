import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trpc } from '../utils/trpc';
import { isValidEmail, isValidPassword } from '../utils/verifyData/userData';

const SignUp: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyPassword, setVerifyPassword] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

  const emailValidation = isValidEmail(email);
  const passValidation = isValidPassword(password);

  const mutation = trpc.user.createUser.useMutation();

  const router = useRouter();

  console.log(mutation);

  const isEqualPassword = password === verifyPassword;

  const createUser = (e: React.FormEvent<HTMLFormElement>) => {
    /* signIn('credentials', { redirect: false, password, email }); */
    e.preventDefault();

    mutation.mutate({ email, password });
  };

  useEffect(() => {
    if (redirect) {
      router.push('/login');
    }
  }, [redirect, router]);

  useEffect(() => {
    if (mutation.error && !mutation.isLoading) {
      toast.error(mutation.error?.message),
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4500
        };
    } else if (mutation.isSuccess) {
      toast.success(
        'Seu usuário foi criado com sucesso! Você será redirecionado'
      ),
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000
        };

      setTimeout(() => {
        setRedirect(true);
      }, 3000);

      setEmail('');
      setPassword('');
      setVerifyPassword('');
    }
  }, [mutation.isLoading]);

  return (
    <div className="flex h-full w-full min-h-screen items-center justify-start">
      <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 md:w-1/2">
        <div className="flex w-7/12 flex-col items-start justify-center md:w-5/12">
          <h2 className="my-4 text-xl font-bold text-gray-900">Criar conta</h2>
          <h3 className="text-sm font-medium text-gray-500">
            Cria sua conta para que possa usar todos os nossos serviços
          </h3>
        </div>

        <form
          onSubmit={(e) => createUser(e)}
          className="flex h-fit w-7/12 flex-col md:w-5/12"
        >
          <label htmlFor="email" className="mb-1 mt-3 text-sm text-gray-600">
            E-mail
          </label>
          <input
            placeholder="Insira seu e-mail"
            type="text"
            name="email"
            id="email"
            className="h-11 w-full rounded-md border border-gray-300 pl-2 shadow-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!emailValidation && email && (
            <p className="mt-1 text-sm text-red-600">Insira um e-mail válido</p>
          )}

          <label htmlFor="password" className="mb-1 mt-3 text-sm text-gray-600">
            Senha
          </label>
          <input
            placeholder="********"
            type="password"
            name="password"
            id="password"
            className="h-11 w-full rounded-md border border-gray-300 pl-2 shadow-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label
            htmlFor="verifyPassword"
            className="mb-1 mt-3 text-sm text-gray-600"
          >
            Verificar Senha
          </label>
          <input
            placeholder="********"
            type="passowrd"
            name="verifyPassword"
            id="verifyPassword"
            className="h-11 w-full rounded-md border border-gray-300 pl-2 shadow-md"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />

          {isEqualPassword && (
            <p className="mt-1 text-sm text-red-600">Senhas não estão iguais</p>
          )}
          {!passValidation && password && (
            <p className="mt-1 text-sm text-red-600">
              A senha precisa ter entre 4 e 20 digitos
            </p>
          )}

          <button
            disabled={mutation.isLoading || mutation.isSuccess}
            className="mt-3 h-10 w-full rounded-md bg-blue-700 text-sm font-bold text-white shadow-md md:text-base"
            type="submit"
          >
            Criar conta
          </button>

          <button
            disabled={mutation.isLoading || mutation.isSuccess}
            className="mt-3 flex h-10 w-full items-center justify-center rounded-md text-sm font-bold text-white shadow-md md:text-base"
            type="submit"
          >
            <div className="justify flex items-center">
              <FcGoogle className="mx-4" />
              <p className="text-gray-700 md:text-base">Logar com o Google</p>
            </div>
          </button>

          <p className="mt-4 text-sm mx-auto text-gray-500">
            já tem uma conta?{' '}
            <a
              className="cursor-pointer text-blue-600"
              onClick={() => router.push('/login')}
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

export default SignUp;
