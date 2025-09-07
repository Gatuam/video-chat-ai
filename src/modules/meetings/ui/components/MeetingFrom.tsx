"use client";
import React, { useState } from "react";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { meetingSchema } from "../../schema";
import { MeetingGetOne } from "../../types";
import CommandSelect from "./CommandSelect";
import { GenAvatarImage } from "@/components/global/GenAvatar";
import { NewAgentDailog } from "@/modules/agent/ui/components/NewAgentDailog";

interface Props {
  onSuccess?: (id?: string) => void;
  onCancle?: () => void;
  initialVale?: MeetingGetOne;
}

export const MeetingFrom = ({ onSuccess, onCancle, initialVale }: Props) => {
  const [agentSearch, setAgnetSearch] = useState("");
  const [openNewAgentDailog, setOpenNewAgentDailog] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const agents = useQuery(
    trpc.agent.getmany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getmany.queryOptions({})
        );
        if (initialVale?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialVale?.id })
          );
        }
        onSuccess?.(data?.id);
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    })
  );
  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getmany.queryOptions({})
        );
        if (initialVale?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialVale?.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    })
  );
  const form = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      name: initialVale?.name ?? "",
      agentId: initialVale?.agentsId ?? "",
    },
  });
  const isEdit = !!initialVale?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;
  const onSubmit = (values: z.infer<typeof meetingSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialVale.id });
    } else {
      createMeeting.mutate(values);
    }
  };
  return (
    <>
      <NewAgentDailog
        open={openNewAgentDailog}
        onOpenChange={setOpenNewAgentDailog}
      />
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className=" space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g . Marketing metting" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select an agent</FormLabel>
                    <FormControl>
                      <CommandSelect
                        option={(agents?.data?.items ?? []).map((agent, i) => ({
                          id: agent.id,
                          value: agent.id,
                          children: (
                            <div className=" flex items-center gap-x-2">
                              <GenAvatarImage name={agent.name} />
                              <span>{agent.name}</span>
                            </div>
                          ),
                        }))}
                        onSelect={field.onChange}
                        onSearch={setAgnetSearch}
                        value={field.value}
                        placeholder="Selected an agent"
                      />
                    </FormControl>
                    <FormDescription className="mt-2">
                      Not found what you&apos; re looking for?{" "}
                      <button
                        type="button"
                        className=" text-blue-500/70 hover:underline text-sm"
                        onClick={() => setOpenNewAgentDailog(true)}
                      >
                        Create new agent
                      </button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" flex justify-between">
              {onCancle && (
                <Button
                  variant={"ghost"}
                  disabled={isPending}
                  type="button"
                  onClick={() => onCancle()}
                >
                  Cancle
                </Button>
              )}
              <Button disabled={isPending} type="submit">
                {isEdit ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
