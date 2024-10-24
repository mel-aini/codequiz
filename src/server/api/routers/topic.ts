import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const topicRouter = createTRPCRouter({
  get: publicProcedure
    .query(async ({ ctx }) => {
      const topics = await ctx.db.topic.findMany();
      return topics ?? null
    }),

  getOne: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ ctx, input }) => {
        const post = await ctx.db.topic.findFirst({
            where: { 
              id: input.id 
            },
        });
        return post ?? null;
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), text: z.string(), image: z.string(), brandColor: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.topic.create({
        data: {
          name: input.name,
          text: input.text,
          image: input.image,
          brandColor: input.brandColor
        },
      });
    }),

  update: protectedProcedure
   .input(z.object({ name: z.string(), text: z.string(), image: z.string(), brandColor: z.string(), newName: z.string() }))
   .mutation(async ({ ctx, input }) => {
      return ctx.db.topic.update({
        where: {
            name: input.name
        },
        data: {
          name: input.newName,
          text: input.text,
          image: input.image,
          brandColor: input.brandColor
        },
      });
  }),

  delete: protectedProcedure
    .input(z.object({name: z.string()}))
    .mutation(async ( {ctx, input} ) => {
        ctx.db.topic.delete({
            where: {
                name: input.name
            }
        })
    })
});
