import { ErrorState } from "@/components/global/ErrorState";
import { LoadingState } from "@/components/global/LoadingState";
import { auth } from "@/lib/auth";
import { ListAgent } from "@/modules/agent/ui/components/ListAgent";
import { AgentView } from "@/modules/agent/ui/views/AgentView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agent.getmany.queryOptions());

  return (
    <>
      <ListAgent />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading Agents"
              description="It may take few seconds!"
            />
          }
        >
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Failed to load Agents"
                description="Something went wrong!"
              />
            }
          >
            <AgentView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
