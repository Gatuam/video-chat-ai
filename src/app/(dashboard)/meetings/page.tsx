import { ErrorState } from "@/components/global/ErrorState";
import { LoadingState } from "@/components/global/LoadingState";
import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/modules/meetings/params";
import { ListMeetings } from "@/modules/meetings/ui/components/ListMeeting";
import { MeetingsView } from "@/modules/meetings/ui/views/MeetingsView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  serachparams: Promise<SearchParams>;
}
const Page = async ({ serachparams }: Props) => {
  const filter = await loadSearchParams(serachparams);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getmany.queryOptions({ ...filter })
  );

  return (
    <>
      <ListMeetings />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading Meetings"
              description="It may take few seconds!"
            />
          }
        >
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Error while getting mettings"
                description="Somthing went wrong!"
              />
            }
          >
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
