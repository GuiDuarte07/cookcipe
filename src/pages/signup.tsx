import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {FcGoogle} from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { trpc } from "../utils/trpc";
import { isValidEmail, isValidPassword } from "../utils/verifyData/userData";

const SignUp: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const mutation = trpc.user.createUser.useMutation();

  const router = useRouter();

  console.log(mutation)

  const isEqualPassword = password === verifyPassword;
  
  const createUser = (e: React.FormEvent<HTMLFormElement>) => {
    /* signIn('credentials', { redirect: false, password, email }); */
    e.preventDefault();

    mutation.mutate({email, password});
  };

  useEffect(() => {
    if (redirect) {
      router.push("/login")
    }
  }, [redirect, router]);

  useEffect(() => {
    if (mutation.error && !mutation.isLoading) {
      toast.error(mutation.error?.message), {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4500,
      };
    } else if (mutation.isSuccess) {
      toast.success("Seu usuário foi criado com sucesso! Você será redirecionado"), {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      };
      
      setTimeout(() => {
        setRedirect(true);
      }, 3000);
      
      setEmail("");
      setPassword("");
      setVerifyPassword("");
    }
  }, [mutation.isLoading])

  return (
    <div className="w-full h-full flex items-center justify-start">
      <div className="h-full md:w-1/2 flex flex-col bg-gray-50 items-center justify-center w-full">

        <div className="flex items-start flex-col justify-center w-7/12 md:w-5/12">
        <h2 className="text-2xl text-gray-900 font-bold mb-4">Criar conta</h2>
        <h3 className="text-sm text-gray-500 font-medium">Cria sua conta para que possa usar todos os nossos serviços</h3>
        </div>

        <form onSubmit={(e) => createUser(e)} className="flex flex-col h-fit w-7/12 md:w-5/12">
          <label htmlFor="email" className="text-sm text-gray-600 mb-1 mt-6">E-mail</label>
          <input placeholder="Insira seu e-mail" type="text" name="email" id="email" 
          className="w-full h-11 border border-gray-300 shadow-md rounded-md pl-2"
          value={email} onChange={(e) => setEmail(e.target.value)}/>

          {!isValidEmail(email) && email && <p className="text-red-600 text-sm mt-2">Insira um e-mail válido</p>}

          <label htmlFor="password" className="text-sm text-gray-600 mb-1 mt-6">Senha</label>
          <input placeholder="********"type="password" name="password" id="password" 
          className="w-full h-11 border border-gray-300 shadow-md rounded-md pl-2" 
          value={password} onChange={(e) => setPassword(e.target.value)}/>

          <label htmlFor="verifyPassword" className="text-sm text-gray-600 mb-1 mt-6">Verificar Senha</label>
          <input placeholder="********"type="passowrd" name="verifyPassword" id="verifyPassword" 
          className="w-full h-11 border border-gray-300 shadow-md rounded-md pl-2" 
          value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)}/>

          {!isEqualPassword && <p className="text-red-600 text-sm mt-2">Senhas não estão iguais</p>}
          {!isValidPassword(password) && password && <p className="text-red-600 text-sm mt-2">A senha precisa ter entre 4 e 20 digitos</p>}

          <button disabled={mutation.isLoading || mutation.isSuccess} className="text-sm w-full h-11 bg-blue-700 rounded-md mt-6 text-white font-bold shadow-md md:text-lg" type="submit">Criar conta</button>

          <button disabled={mutation.isLoading || mutation.isSuccess} className="text-sm flex items-center justify-center w-full h-11 rounded-md mt-6 text-white font-bold shadow-md md:text-lg" type="submit">
            <div className="flex items-center justify">
            <FcGoogle className="mx-4"/>
            <p className="text-gray-700">Logar com o Google</p>
            </div>
          </button>

          <p className="mt-8 text-gray-500">já tem uma conta? <a className="text-blue-600 cursor-pointer" onClick={() => router.push("/login")}>Clique aqui</a></p>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignUp;