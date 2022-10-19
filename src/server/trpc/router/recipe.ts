import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const recipeRoutes = router({
  // createRecipe: protectedProcedure
  //   .input(z.object({
      
  //   }))
  //   .mutation(({ ctx }) => {
  //     ctx.prisma.recipe.create({
  //       data: {
  //         cookTime: 25,
  //         description: "Faça um arroz com queijo delicioso!",
  //         difficulty: "fácil",
  //         prepTime: 10,
  //         serves: 6,
  //         title: "Arroz com ovo",
  //         home_appliance: {
  //           connect: {
  //             id
  //           }
  //         }
  //         author: {
  //           connect: {id: ctx.session.user.id}
  //         }
  //       },
        
  //     })
  //   }),
  getRecipes: publicProcedure
    .input(z.object({
      skipCount: z.number()
    }))
    .mutation(async ({ctx, input}) => {
      const recipes = await ctx.prisma.recipe.findMany({
        where: {
          published: true
        },
        skip: input.skipCount,
        take: 10,
        select: {
          id: true,
          title: true,
          cookTime: true,
          prepTime: true,
          likes: true,
          difficulty: true,
          serves: true,
          description: true,
        }
      })

      return recipes;
    })
});
