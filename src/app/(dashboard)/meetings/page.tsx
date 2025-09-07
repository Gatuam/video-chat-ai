import { ErrorState } from "@/components/global/ErrorState";
import { LoadingState } from "@/components/global/LoadingState";
import { MeetingsView } from "@/modules/meetings/ui/views/MeetingsView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getmany.queryOptions({}));

  return (
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
    
  );
};

export default Page;
