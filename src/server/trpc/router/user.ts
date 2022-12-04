import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import {
  isValidEmail,
  isValidPassword
} from '../../../utils/verifyData/userData';
import { router, publicProcedure } from '../trpc';

const userRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const email = input.email.trim().toLowerCase();
      const password = input.password.trim();

      if (!isValidEmail(email))
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Email precisa ser válido.'
        });

      if (!isValidPassword(password))
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Senha precisa ser ter entre 4 e 20 caracteres.'
        });

      const passwordHash: string = await bcrypt.hash(password, 10);

      if (!passwordHash)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro inesperado ocorreu.'
        });

      try {
        await ctx.prisma.user.create({
          data: {
            email,
            password_hash: passwordHash
          },
          select: {
            email: true,
            password_hash: true,
            id: true
          }
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002')
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'Já existe um usuário com esse e-mail cadastrado'
            });
        }
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Erro não catalogado'
        });
      }
      return true;
    })
});

export default userRouter;
