import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const recipeMethods = router({
  createRecipe: protectedProcedure
    .input(z.object({
      
    }))
    .mutation(({ ctx }) => {
      ctx.prisma.recipe.create({
        data: {
          cookTime: 25,
          description: "Faça um arroz com queijo delicioso!",
          difficulty: "fácil",
          prepTime: 10,
          serves: 6,
          title: "Arroz com ovo",
          home_appliance: {
            connect: {
              id
            }
          }
          author: {
            connect: {id: ctx.session.user.id}
          }
        },
        
      })
    }),
});
