"use client";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { AgentIdViewHeader } from "../components/AgentIdViewHeader";
import { GenAvatarImage } from "@/components/global/GenAvatar";
import { Badge } from "@/components/ui/badge";
import {  VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { id } from "date-fns/locale";
import { UpdateAgentDailog } from "../components/UpdateAgentDailog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const [updateDailogOpen, setUpdateAgentDailogOpen] = useState(false)
  const router = useRouter()
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.agent.getOne.queryOptions({
      id: agentId,
    })
  );
  const removeAgent = useMutation(
    trpc.agent.remove.mutationOptions({
      onSuccess:async()=> {
       await queryClient.invalidateQueries(trpc.agent.getmany.queryOptions({}));
        router.push('/agents')
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
   <UpdateAgentDailog
   onOpenChange={setUpdateAgentDailogOpen}
   open={updateDailogOpen}
   initialValues={data}
   />
     <div className=" flex-1 py-4 px-4 md:px-8 flex-col gap-y-4 space-y-3">
      <AgentIdViewHeader
        agentName={data.name}
        agentId={data.id}
        onEdit={() => setUpdateAgentDailogOpen(true)}
        onRemove={() => removeAgent.mutate({id : agentId})}
      />
      <div className=" bg-accent rounded-lg border">
        <div className=" px-4 py-5 gap-y-6 flex flex-col col-span-5">
          <div className=" flex items-center gap-x-3">
            <GenAvatarImage name={data.name} />
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
              {data.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
};
