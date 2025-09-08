import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, productedprocedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z, { string } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/const/constant";
import { meetingSchema, meetingUpadteSchema } from "../schema";
import { MeetingStatus } from "../types";
import { streamVideo } from "@/lib/stream-video";
import { generateAvatarUrl } from "@/lib/avatar";

export const meetingsRouter = createTRPCRouter({
  generateToken: productedprocedure.mutation(async ({ ctx }) => {
    const avatarUrl =
      ctx.auth.user.image ?? generateAvatarUrl(ctx.auth.user.name || "User");
    await streamVideo.upsertUsers([
      {
        id: ctx.auth.user.id,
        name: ctx.auth.user.name,
        role: "admin",
        image: ctx.auth.user.image ?? avatarUrl,
      },
    ]);
    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issueAt = Math.floor(Date.now() / 1000) - 60;
    const token = streamVideo.generateUserToken({
      user_id: ctx.auth.user.id,
      exp: expirationTime,
      validity_in_seconds: issueAt,
    });
    return token;
  }),
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
      const call = streamVideo.video.call("default", createMeeting.id);
      await call.create({
        data: {
          created_by_id: ctx.auth.user.id,
          custom: {
            meetingId: createMeeting.id,
            meetingName: createMeeting.name,
          },
          settings_override: {
            transcription: {
              language: "en",
              mode: "auto-on",
              closed_caption_mode: "auto-on",
            },
            recording: {
              mode: "auto-on",
              quality: "720p",
            },
          },
        },
      });
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, createMeeting.agentsId));
      if (!existingAgent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent not found!",
        });
      }
      const avatarUrl =
        ctx.auth.user.image ?? generateAvatarUrl(existingAgent.name || "User");
      await streamVideo.upsertUsers([
        {
          id: existingAgent.id,
          name: existingAgent.name,
          role: "user",
          image: avatarUrl,
        },
      ]);

      return createMeeting;
    }),
  getOne: productedprocedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [ExistingMeeting] = await db
        .select({
          ...getTableColumns(meetings),
          agent: agents,
          duration: sql<number>`EXTRACT(EPOCH FROM (end_at - start_at))`.as(
            "duration"
          ),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentsId, agents.id))
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
        agentId: z.string().nullish(),
        status: z
          .enum([
            MeetingStatus.Upcoming,
            MeetingStatus.Active,
            MeetingStatus.Completed,
            MeetingStatus.Processing,
            MeetingStatus.Cancelled,
          ])
          .nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize, status, agentId } = input;
      const data = await db
        .select({
          ...getTableColumns(meetings),
          agent: agents,
          duration: sql<number>`EXTRACT(EPOCH FROM (end_at - start_at))`.as(
            "duration"
          ),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentsId, agents.id))
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}`) : undefined,
            status ? eq(meetings.status, status) : undefined,
            agentId ? eq(meetings.agentsId, agentId) : undefined
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
        .innerJoin(agents, eq(meetings.agentsId, agents.id))
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}`) : undefined,
            status ? eq(meetings.status, status) : undefined,
            agentId ? eq(meetings.agentsId, agentId) : undefined
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
