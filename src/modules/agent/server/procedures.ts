import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  productedprocedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentSchema } from "../schema";
import z from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [ExistingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input?.id));
      return ExistingAgent;
    }),
  getmany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
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
