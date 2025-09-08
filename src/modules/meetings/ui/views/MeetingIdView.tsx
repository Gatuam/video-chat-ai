"use client";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { GenAvatarImage } from "@/components/global/GenAvatar";
import { Badge } from "@/components/ui/badge";
import {  VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UpdateAgentDailog } from "@/modules/agent/ui/components/UpdateAgentDailog";
import { MeetingIdViewHeader } from "../components/MeetingIdViewHeader";
import { UpdateMeetingDailog } from "../components/UpdateMeetingDailog";


interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const [updateDailogOpen, setUpdateAgentDailogOpen] = useState(false)
  const router = useRouter()
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );
  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess:async()=> {
       await queryClient.invalidateQueries(trpc.meetings.getmany.queryOptions({}));
        router.push('/meetings')
      },
      onError:  (error)=> {
        toast.error(error.message)
      }
    })
  );
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
        onRemove={() => removeMeeting.mutate({id : meetingId})}
      />
      <div className=" bg-accent rounded-lg border">
        <div className=" px-4 py-5 gap-y-6 flex flex-col col-span-5">
          <div className=" flex items-center gap-x-3">
            {/* <GenAvatarImage name={data.name} /> */}
            <h2 className=" text-2xl font-medium">{data.name}</h2>
          </div>
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600 cursor-pointer"
          >
            <VideoIcon />
            Meetings
          </Badge>
          <div className=" flex flex-col gap-y-3">
            <p className="text-lg font-medium underline">Instructions</p>
            <p className=" text-sm text-accent-foreground/50">
              {data.duration}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
};
