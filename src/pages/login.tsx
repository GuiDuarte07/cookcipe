import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {FcGoogle} from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { trpc } from "../utils/trpc";


const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginWithCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn('credentials', { email, password, redirect: false }).
      then((res) => {
        if (res?.ok) {
          router.push('/')
        } else {
          console.log(res?.error);
          toast.error("Falha ao realizar o login"), {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          }
        }
      });
  }

  return (
    <div className="w-full h-full flex items-center justify-start">
      <div className="h-full md:w-1/2 flex flex-col bg-gray-50 items-center justify-center w-full">

        <div className="flex items-start flex-col justify-center w-7/12 md:w-5/12">
        <h2 className="text-2xl text-gray-900 font-bold mb-4">Bem-vindo novamente!</h2>
        <h3 className="text-sm text-gray-500 font-medium">Faça seu login para continuar acessando nosso site</h3>
        </div>

        <form onSubmit={(e) => loginWithCredentials(e)} className="flex flex-col h-fit w-7/12 md:w-5/12">
          <label htmlFor="email" className="text-sm text-gray-600 mb-1 mt-10">E-mail</label>
          <input placeholder="Insira seu e-mail" type="text" name="email" id="email" 
          className="w-full h-11 border border-gray-300 shadow-md rounded-md pl-2"
          value={email} onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor="password" className="text-sm text-gray-600 mb-1 mt-10">Senha</label>
          <input placeholder="********"type="password" name="password" id="password" 
          className="w-full h-11 border border-gray-300 shadow-md rounded-md pl-2" 
          value={password} onChange={(e) => setPassword(e.target.value)}/>

          <button className="text-sm w-full h-11 bg-blue-700 rounded-md mt-10 text-white font-bold shadow-md md:text-lg" type="submit">Logar</button>
          <button className="text-sm flex items-center justify-center w-full h-11 rounded-md mt-10 text-white font-bold shadow-md md:text-lg" type="submit">
            <div className="flex items-center justify">
            <FcGoogle className="mx-4"/>
            <p className="text-gray-700">Logar com o Google</p>
            </div>
          </button>

          <p className="mt-8 text-gray-500">Não tem uma conta? <a className="text-blue-600 cursor-pointer" onClick={() => router.push("/signup")}>Clique aqui</a></p>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login;