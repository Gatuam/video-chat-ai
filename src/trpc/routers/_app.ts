import {  createTRPCRouter } from '../init';
import { agentsRouter } from '@/modules/agent/server/procedures';
export const appRouter = createTRPCRouter({
  agent: agentsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;