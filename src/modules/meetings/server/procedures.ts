import { db } from "@/db";
import { meetings } from "@/db/schema";
import { createTRPCRouter, productedprocedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z, { string } from "zod";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/const/constant";
import { meetingSchema, meetingUpadteSchema } from "../schema";

export const meetingsRouter = createTRPCRouter({
  update: productedprocedure
    .input(meetingUpadteSchema)
    .mutation(async ({ ctx, input }) => {
      const [updateMeeting] = await db
        .update(meetings)
        .set(input)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        )
        .returning();
      if (!updateMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent not found!",
        });
      }
      return updateMeeting;
    }),
  remove: productedprocedure
    .input(
      z.object({
        id: string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [removeMeeting] = await db
        .delete(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        )
        .returning();
      if (!removeMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent not found!",
        });
      }
      return removeMeeting;
    }),
  create: productedprocedure
    .input(meetingSchema)
    .mutation(async ({ input, ctx }) => {
      const { auth } = ctx;
      const [createMeeting] = await db
        .insert(meetings)
        .values({
          name: input.name,
          agentsId: input.agentId,
          userId: auth?.user?.id,
        })
        .returning();
      return createMeeting;
    }),
  getOne: productedprocedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [ExistingMeeting] = await db
        .select()
        .from(meetings)
        .where(
          and(eq(meetings.id, input?.id), eq(meetings.userId, ctx.auth.user.id))
        );
      if (!ExistingMeeting) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
      }
      return ExistingMeeting;
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
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}`) : undefined
          )
        )
        .orderBy(desc(meetings.createAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const [total] = await db
        .select({
          count: count(),
        })
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}`) : undefined
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
});
