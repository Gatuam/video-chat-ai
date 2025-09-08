"use client";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { GenAvatarImage } from "@/components/global/GenAvatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UpdateAgentDailog } from "@/modules/agent/ui/components/UpdateAgentDailog";
import { MeetingIdViewHeader } from "../components/MeetingIdViewHeader";
import { UpdateMeetingDailog } from "../components/UpdateMeetingDailog";
import { UpcomingState } from "../components/UpcomingState";
import { ActiveState } from "../components/ActiveState";
import { CancelledState } from "../components/CancelledState";
import { ProcessingState } from "../components/ProcessingState";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const [updateDailogOpen, setUpdateAgentDailogOpen] = useState(false);
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );
  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getmany.queryOptions({})
        );
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  // const [ RemoveConfirmation, confirmRemove ] = useConfirm(
  //   'Are you sure?',
  //   `This will remove all of the following ${data.name} meetings data!`
  // )
  // const handleRemoveAgent = async () => {
  //   const ok = await confirmRemove();
  //   if(!ok) return ;

  //   await removeAgent.mutateAsync({id : agentId})
  // }
  return (
    <>
      {/** <RemoveConfirmation/>  */}
      <UpdateMeetingDailog
        onOpenChange={setUpdateAgentDailogOpen}
        open={updateDailogOpen}
        initialValues={data}
      />
      <div className=" flex-1 py-4 px-4 md:px-8 flex-col gap-y-4 space-y-3">
        <MeetingIdViewHeader
          meetingName={data.name}
          meetingId={data.id}
          onEdit={() => setUpdateAgentDailogOpen(true)}
          onRemove={() => removeMeeting.mutate({ id: meetingId })}
        />
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState  />}
        {isCompleted && <div>Completed</div>}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelling={() => {}}
            isCancelling={false}
          />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
      </div>
    </>
  );
};
