import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useReducer } from 'react';
import { BsFillArrowUpRightSquareFill } from 'react-icons/bs';
import { RiEditBoxFill } from 'react-icons/ri';
import { Home_appliance } from '@prisma/client';
import Header from '../../../components/Header';
import CreateStep from '../../../components/recipeCreate/step';
import Dificulty from '../../../utils/enums';
import { prisma } from '../../../server/db/client';
import ListInput from '../../../components/recipeCreate/ListInput';
import { ApplianceEnum, applianceReducer } from '../../../reducers/ApplianceReducer';
import { stepReducer, StepsEnum } from '../../../reducers/StepReducer';

type Props = {
  home_appliance: Home_appliance[];
};

const CreateRecipe: NextPage<Props> = ({ home_appliance }) => {
  const [steps, stepDispatch] = useReducer(stepReducer, [
    { step: 1, text: '' }
  ]);

  const [applianceList, applianceDispatch] = useReducer(applianceReducer, [home_appliance, []]);

  const changeSteps = (step: number, value: string) => {
    stepDispatch({ type: StepsEnum.TEXT, step, value });
  };

  const deleteStep = (step: number) => {
    stepDispatch({ type: StepsEnum.DELETE, step })
  }

  const changeSelectAppliance = (id: number) => {
    applianceDispatch({ type: ApplianceEnum.FILTER, id })
  };

  const changeListAppliance = (id: number) => {
    applianceDispatch({ type: ApplianceEnum.DELETE, id })
  };

  return (
    <>
      <Head>
        <title>Criar receita</title>
        <meta name="description" />
      </Head>
      <div className="flex h-full w-full flex-col content-center items-center dark:bg-zinc-800 ">
        <Header />

        <div className="mt-14 min-h-full w-9/12 max-w-6xl">
          <h2 className="my-4 text-lg font-bold">Criar nova receita</h2>

          <form className="my-4 flex flex-col gap-4 rounded-lg bg-slate-50 px-2 py-4 shadow-xl">
            <div className="flex flex-col gap-3">
              <label htmlFor="titulo" className="text-lg font-bold">
                Título da receita
              </label>
              <input
                type="text"
                name="titulo"
                id="titulo"
                placeholder="Título da receita"
                className="h-9 rounded text-gray-700 outline-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold">Descrição da receita</h3>
              <textarea
                name=""
                className="min-h-[100px] rounded text-gray-700 outline-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold">Utensilios necessários</h3>
              <ListInput
                list={applianceList[0]}
                selectionList={applianceList[1]}
                addInSelect={changeSelectAppliance}
                removeFromSelect={changeListAppliance}
              />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold">Etapas</h3>
              {steps.map(({ step, text }) => (
                <CreateStep
                  onClick={deleteStep}
                  key={step}
                  step={step}
                  onChange={changeSteps}
                  text={text}
                />
              ))}
              <button
                onClick={() => stepDispatch({ type: StepsEnum.ADD })}
                type="button"
                className="flex cursor-pointer items-center gap-2 self-start rounded bg-orange-400 p-3 text-white"
              >
                Adicionar nova etapa
              </button>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="preparo" className="">
                Tempo de preparo
              </label>
              <input
                type="number"
                min="0"
                name="preparo"
                id="preparo"
                className="h-6 w-12 rounded bg-slate-200 text-gray-700 outline-none"
              />
              minutos
              <label htmlFor="cozimento" className="">
                Tempo de cozimento
              </label>
              <input
                type="number"
                min="0"
                name="cozimento"
                id="cozimento"
                className="h-6 w-12 rounded bg-slate-200 text-gray-700 outline-none"
              />
              minutos
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="difficulty"
                className="block font-bold text-gray-900 dark:text-gray-400"
              >
                Selecione a dificuldade
              </label>
              <select
                id="difficulty"
                className="block w-20 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value={Dificulty.easy} defaultValue="true">
                  Fácil
                </option>
                <option value={Dificulty.medium}>Médio</option>
                <option value={Dificulty.hard}>Difícil</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="serve" className="">
                Serve
              </label>
              <input
                type="number"
                min="0"
                name="serve"
                id="serve"
                className="h-6 w-12 rounded bg-slate-200 text-gray-700 outline-none"
              />
              pessoas
            </div>

            <div className="mt-2 flex w-full">
              <button type="submit" className="w-fit">
                <div className="flex cursor-pointer items-center gap-2 rounded bg-indigo-800 p-2">
                  <BsFillArrowUpRightSquareFill className="fill-white" />
                  <p className="text-sm text-white">Publicar</p>
                </div>
              </button>
              <button type="submit" className="w-fit">
                <div className="mx-2 ml-6 flex cursor-pointer items-center gap-2 rounded bg-blue-500 p-2">
                  <RiEditBoxFill className="fill-white" />
                  <p className="text-sm text-white">Salvar</p>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const home_appliance = await prisma.home_appliance.findMany();

  return {
    props: {
      home_appliance
    }
  };
};

export default CreateRecipe;
