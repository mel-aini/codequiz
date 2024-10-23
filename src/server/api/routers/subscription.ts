import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { Difficulty, Subscription } from "@prisma/client";

function getNextDifficulty(curr: Difficulty, questionNumber: number, maxQuestions: number): Difficulty {
    if (questionNumber == maxQuestions) {
        switch (curr) {
            case 'BEGINNER':
                return 'INTERMEDIATE'
            case 'INTERMEDIATE':
                return 'ADVANCED'
        }
    }
    return curr;
}

function getNextQuestionNumber(sub: Subscription): number {
    if (sub.questionNumber == sub.totalQuestions) {
        if (sub.difficulty == 'ADVANCED') return sub.questionNumber
        else return 1
    }
    return sub.questionNumber + 1
}

export const subscriptionRouter = createTRPCRouter({
  get: protectedProcedure
    .query(async ({ ctx }) => {
        return await ctx.db.subscription.findMany();
    }),

    getLatest: protectedProcedure
    .query(async ({ ctx }) => {
        return await ctx.db.subscription.findMany({
            orderBy: { updatedAt: 'asc' },
            take: 3
        });
    }),

  create: protectedProcedure
    .input(z.object({ userId: z.string(), topicId: z.string() }))
    .mutation(async ({ ctx, input }) => {
        return await ctx.db.subscription.create({
        data: {
            userId: ctx.session.user.id,
            topicId: input.topicId
        },
      });
    }),

  update: protectedProcedure
   .input(z.object({ id: z.string() }))
   .mutation(async ({ ctx, input }) => {
        const sub = await ctx.db.subscription.findUnique({
            where: {
                id: input.id
            }
        })
    
        if (!sub) return null;

        const updatedSub = await ctx.db.subscription.update({
            where: {
                id: input.id
            },
            data: {
                questionNumber: getNextQuestionNumber(sub),
                difficulty: getNextDifficulty(sub.difficulty, sub.questionNumber, sub.totalQuestions),
                isComplete: sub.questionNumber == sub.totalQuestions && sub.difficulty == 'ADVANCED'
            },
          })
        return updatedSub ?? null
  }),

  delete: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ( {ctx, input} ) => {
        return await ctx.db.subscription.delete({
            where: {
                id: input.id
            }
        })
    })
});
