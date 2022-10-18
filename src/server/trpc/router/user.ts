import { isValidPassword } from './../../../utils/verifyData/userData';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcrypt";
import { isValidEmail } from '../../../utils/verifyData/userData';
import { Prisma } from '@prisma/client';

export const userRouter = router({
  createUser: publicProcedure
    .input(z.object({
      email: z.string(),
      password: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      //console.log(await ctx.prisma.home_appliance.findMany());

      const email = input.email.trim().toLowerCase();
      const password = input.password.trim();
      
      if (!isValidEmail(email)) 
        throw new TRPCError({
          code:"BAD_REQUEST",
          message:"Email precisa ser válido."
        });

      if (!isValidPassword(password))
        throw new TRPCError({
          code:"BAD_REQUEST",
          message:"Senha precisa ser ter entre 4 e 20 caracteres."
        });
      
      const password_hash: string = await bcrypt.hash(password, 10);

      if(!password_hash)
      throw new TRPCError({
        code:"INTERNAL_SERVER_ERROR",
        message:"Erro inesperado ocorreu."
      });

      try {
        console.log('inserindo no prisma')
        const userData = await ctx.prisma.user.create({
          data: {
            email,
            password_hash,
          },
          select: {
            email: true,
            password_hash: true,
            id: true
          }
        });

        console.log(userData);
      } catch(e) {
        console.log('deu ruim')
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002')
            throw new TRPCError({
              code:"CONFLICT",
              message:"Já existe um usuário com esse e-mail cadastrado"
            });
        }
        throw new TRPCError({
          code:"CONFLICT",
          message:"Erro não catalogado"
        });
      }
      console.log("sucefull")
      return true;
    }),
});
