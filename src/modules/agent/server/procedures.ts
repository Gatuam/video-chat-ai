import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, productedprocedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentSchema } from "../schema";
import z from "zod";
import { and, count, desc, eq, ilike, sql } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/const/constant";

export const agentsRouter = createTRPCRouter({
  getOne: productedprocedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [ExistingAgent] = await db
        .select()
        .from(agents)
        .where(
          and(
            eq(agents.id, input?.id), 
            eq(agents.userId, ctx.auth.user.id)
          )
        );
        if(!ExistingAgent){
          throw new TRPCError({code : 'NOT_FOUND', message : "Agent not found"})
        }
      return ExistingAgent;
    }),
  getmany: productedprocedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input;
      const data = await db
        .select()
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}`) : undefined
          )
        )
        .orderBy(desc(agents.createAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const [total] = await db
        .select({
          count: count(),
        })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}`) : undefined
          )
        );
      const totalPages = Math.ceil(total.count / pageSize);
      return {
        items: data,
        total: total.count,
        totalPages,
      };
      //throw new TRPCError({code : "BAD_GATEWAY"})
    }),
  create: productedprocedure
    .input(agentSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, instructions } = input;
      const { auth } = ctx;
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: auth?.user?.id,
        })
        .returning();
      if (!auth?.session) {
      }
    }),
});
