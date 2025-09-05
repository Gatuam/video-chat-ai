import { db } from '@/db';
import { agents } from '@/db/schema';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { TRPCError } from '@trpc/server';

export const agentsRouter = createTRPCRouter({
    getmany : baseProcedure
    .query(async(input)=> {
        const data = await db.select().from(agents);
        // return data;
        throw new TRPCError({code : "BAD_GATEWAY"})
    }),
})
