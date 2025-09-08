"use client";
import { ErrorState } from "@/components/global/ErrorState";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { CallProvider } from "../components/CallProvider";
interface Props {
  meetingId: string;
}
export const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );
  if (data.status === "completed") {
    return (
      <div className=" flex h-screen items-center justify-center">
        <div className=" bg-accent-foreground/5 backdrop-blur-lg border border-accent-foreground/5 rounded-lg border-t-2 border-t-accent-foreground/10 shadow-md">
          <ErrorState
            title="Meeting has ended"
            description="You can no longer join this meeting"
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <CallProvider meetingId={meetingId} meetingName={data.name} />
    </div>
  );
};
