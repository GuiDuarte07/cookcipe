import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useReducer, useRef, useState } from 'react';
import { BsFillArrowUpRightSquareFill } from 'react-icons/bs';
import { RiEditBoxFill, RiDeleteBack2Fill } from 'react-icons/ri';
import { Home_appliance as HomeApplicance } from '@prisma/client';
import Header from '../../../components/Header';
import CreateStep from '../../../components/recipeCreate/step';
import Dificulty from '../../../utils/enums';
import { prisma } from '../../../server/db/client';
import ListInput from '../../../components/recipeCreate/ListInput';
import {
  ApplianceEnum,
  applianceReducer
} from '../../../reducers/ApplianceReducer';
import { stepReducer, StepsEnum } from '../../../reducers/StepReducer';
import Header2 from '../../../components/Header2';

export type RecipeEdit = {
  id: number;
  title: string;
  cookTime: number;
  prepTime: number;
  likes: number;
  difficulty: string;
  serves: number;
  image: string | null;
  description: string;
};

type Props = {
  homeAppliance: HomeApplicance[];
  recipe?: RecipeEdit;
};

const ingredientsTemp = [
  {
    id: 1,
    ingredient: 'Açuçar',
    ingredientText: '2 colheres de sopa de açucar'
  },
  { id: 2, ingredient: 'Arroz', ingredientText: '1kg de arroz branco' },
  { id: 3, ingredient: 'Pão', ingredientText: '2 pães francês' }
];

const CreateRecipe: NextPage<Props> = ({ homeAppliance, recipe }) => {
  const [steps, stepDispatch] = useReducer(stepReducer, [
    { step: 1, text: '' }
  ]);

  const [applianceList, applianceDispatch] = useReducer(applianceReducer, [
    homeAppliance,
    []
  ]);

  const [ingredients, setIngredients] =
    useState<{ id: number; ingredient: string; ingredientText: string }[]>(
      ingredientsTemp
    );

  const titleController = useRef<HTMLInputElement>(null);
  const descriptionController = useRef<HTMLTextAreaElement>(null);
  const prepTimeController = useRef<HTMLInputElement>(null);
  const cookTimeController = useRef<HTMLInputElement>(null);
  const difficultyController = useRef<HTMLSelectElement>(null);
  const servesController = useRef<HTMLInputElement>(null);

  const [ingredientName, setIngredientName] = useState<string>('');
  const [ingredientTextName, setIngredientTextName] = useState<string>('');

  useEffect(() => {
    if (!recipe) return;

    (titleController.current as HTMLInputElement).value = recipe.title;
    (descriptionController.current as HTMLTextAreaElement).value =
      recipe.description;
    (prepTimeController.current as HTMLInputElement).value =
      recipe.prepTime.toString();
    (cookTimeController.current as HTMLInputElement).value =
      recipe.cookTime.toString();
    (difficultyController.current as HTMLSelectElement).value = 'Fácil';
    (servesController.current as HTMLInputElement).value =
      recipe.serves.toString();
  }, [recipe]);

  const changeSteps = (step: number, value: string) => {
    stepDispatch({ type: StepsEnum.TEXT, step, value });
  };

  const deleteStep = (step: number) => {
    stepDispatch({ type: StepsEnum.DELETE, step });
  };

  const changeSelectAppliance = (id: number) => {
    applianceDispatch({ type: ApplianceEnum.FILTER, id });
  };

  const changeListAppliance = (id: number) => {
    applianceDispatch({ type: ApplianceEnum.DELETE, id });
  };

  const addIngredient = () => {
    if (!ingredientName || !ingredientTextName) return;

    setIngredients((prev) => [
      ...prev,
      {
        ingredient: ingredientName,
        ingredientText: ingredientTextName,
        id: prev.length + Math.round(Math.random() * 100)
      }
    ]);
  };

  return (
    <>
      <Head>
        <title>Criar receita</title>
        <meta name="description" />
      </Head>
      <div className="flex h-full w-full flex-col content-center items-center dark:bg-zinc-800">
        <Header2 />

        <div className="mt-14 min-h-full w-9/12 max-w-6xl">
          <h2 className="my-4 text-lg font-bold">Criar nova receita</h2>

          <form className="my-4 flex flex-col gap-4 rounded-lg bg-slate-50 px-2 py-4 shadow-xl dark:bg-gray-700">
            <div className="flex flex-col gap-3">
              <label htmlFor="titulo" className="text-lg font-bold">
                Título da receita
              </label>
              <input
                ref={titleController}
                type="text"
                name="titulo"
                id="titulo"
                placeholder="Título da receita"
                className="h-9 rounded pl-1 text-gray-700 outline-none dark:text-gray-200"
              />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold">Descrição da receita</h3>
              <textarea
                ref={descriptionController}
                name=""
                className="min-h-[100px] rounded pt-1 pl-2 text-gray-700 outline-none dark:text-gray-200"
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
                className="flex cursor-pointer items-center gap-2 self-start rounded bg-orange-600 p-3 text-white dark:bg-orange-500"
              >
                Adicionar nova etapa
              </button>
            </div>

            {/* Ingredient list field */}
            <div className="my-2 flex flex-col gap-3">
              <h3 className="text-lg font-bold">Ingredientes</h3>
              {ingredients.map((data) => (
                <div
                  key={data.id}
                  className="flex cursor-pointer items-center rounded-md border-b-2 border-solid border-gray-400 bg-gray-200 px-2 py-2 hover:mr-1 hover:-ml-1 hover:border-gray-300 dark:bg-gray-800"
                >
                  <p className="mr-8 min-w-[90px] max-w-[90px] overflow-hidden overflow-ellipsis whitespace-nowrap border-r-2 border-solid border-gray-400 text-sm dark:text-gray-100">
                    {data.ingredient}
                  </p>
                  <p className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-gray-100">
                    {data.ingredientText}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      const position = ingredients.findIndex(
                        (ingredient) => ingredient.id === data.id
                      );

                      setIngredients((prev) => {
                        const state = structuredClone(prev);

                        state.splice(position, 1);
                        return state;
                      });
                    }}
                  >
                    <RiDeleteBack2Fill className="hover:scale-110 hover:fill-red-600" />
                  </button>
                </div>
              ))}

              {/* Ingredient input field */}
              <div className="mt-7 flex w-full gap-8">
                <label htmlFor="ingredient" className="relative pt-[10px]">
                  <span className="absolute top-[-10px] ">Ingrediente</span>
                  <input
                    type="text"
                    name=""
                    id="ingredient"
                    className="h-7 w-10/12 rounded pl-1 outline-none"
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                  />
                </label>

                <label
                  htmlFor="ingredient"
                  className="relative flex-grow pt-[10px]"
                >
                  <span className="absolute top-[-10px] ">Descrição</span>
                  <input
                    type="text"
                    name=""
                    id="ingredient"
                    className="h-7 w-full rounded pl-1 outline-none"
                    value={ingredientTextName}
                    onChange={(e) => setIngredientTextName(e.target.value)}
                  />
                </label>
              </div>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 self-start rounded bg-purple-800 p-3 text-white dark:bg-purple-700"
                onClick={() => addIngredient()}
              >
                Adicionar ingrediente
              </button>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="preparo" className="">
                Tempo de preparo
              </label>
              <input
                ref={prepTimeController}
                type="number"
                min="0"
                name="preparo"
                id="preparo"
                className="h-6 w-12 rounded bg-slate-200 pl-1 text-gray-700 outline-none dark:bg-gray-500 dark:text-gray-200"
              />
              minutos
              <label htmlFor="cozimento" className="">
                Tempo de cozimento
              </label>
              <input
                ref={cookTimeController}
                type="number"
                min="0"
                name="cozimento"
                id="cozimento"
                className="h-6 w-12 rounded bg-slate-200 pl-1 text-gray-700 outline-none dark:bg-gray-500 dark:text-gray-200"
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
                ref={difficultyController}
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
                ref={servesController}
                type="number"
                min="0"
                name="serve"
                id="serve"
                className="h-6 w-12 rounded bg-slate-200 pl-1 text-gray-700 outline-none dark:bg-gray-500 dark:text-gray-200"
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
              <button type="submit" disabled className=" w-fit">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const recipeId = context.params?.recipeId;

  const redirect = {
    redirect: {
      permanent: false,
      destination: '/404'
    }
  };

  if (typeof recipeId !== 'string') return redirect;

  if (!parseInt(recipeId, 10) && recipeId !== 'new') return redirect;

  const homeAppliance = await prisma.home_appliance.findMany();

  if (recipeId === 'new') {
    return {
      props: {
        homeAppliance
      }
    };
  }

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: parseInt(recipeId, 10)
    },
    select: {
      id: true,
      title: true,
      cookTime: true,
      prepTime: true,
      likes: true,
      difficulty: true,
      serves: true,
      image: true,
      description: true
    }
  });

  if (!recipe) return redirect;

  return {
    props: {
      homeAppliance,
      recipe
    }
  };
};

export default CreateRecipe;
