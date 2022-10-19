import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { recipeRoutes } from './recipe';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  recipe: recipeRoutes,
});

// export type definition of API
export type AppRouter = typeof appRouter;
