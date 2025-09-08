import { ErrorState } from "@/components/global/ErrorState";
import { LoadingState } from "@/components/global/LoadingState";
import { auth } from "@/lib/auth";
import { MeetingIdView } from "@/modules/meetings/ui/views/MeetingIdView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{
    meetingsId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const meetingId = (await params).meetingsId;
  console.log(meetingId);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Agent "
            description="This may take a second!"
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Agent Not fond"
              description="Error while creating agent"
            />
          }
        >
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
