import { ErrorState } from "@/components/global/ErrorState";
import { LoadingState } from "@/components/global/LoadingState";
import { auth } from "@/lib/auth";
import { CallView } from "@/modules/call/ui/views/CallView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/sign-in");
  }

  const { meetingId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className=" w-full h-screen flex justify-center items-center">
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
            <CallView meetingId={meetingId} />
          </ErrorBoundary>
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
