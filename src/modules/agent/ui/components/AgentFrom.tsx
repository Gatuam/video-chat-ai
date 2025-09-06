"use client";
import React from "react";
import { AgentGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentSchema } from "../../schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { toast } from "sonner";

interface Props {
  onSuccess?: () => void;
  onCancle?: () => void;
  initialVale?: AgentGetOne;
}

export const AgentFrom = ({ onSuccess, onCancle, initialVale }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agent.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agent.getmany.queryOptions());
        if (initialVale?.id) {
          await queryClient.invalidateQueries(
            trpc.agent.getOne.queryOptions({ id: initialVale?.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    })
  );
  const form = useForm<z.infer<typeof agentSchema>>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: initialVale?.name ?? "",
      instructions: initialVale?.instructions ?? "",
    },
  });
  const name = form.watch("name") || "User";
  const isEdit = !!initialVale?.id;
  const isPending = createAgent.isPending;
  const onSubmit = (values: z.infer<typeof agentSchema>) => {
    if (isEdit) {
      console.log("agent");
    } else {
      createAgent.mutate(values);
    }
  };
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className=" space-y-4">
            <Avatar>
              <AvatarImage
                className=" cursor-pointer mb-1 size-13 animate-pulse bg-accent-foreground/10 border border-accent-foreground/20 p-1.5 rounded-full"
                src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(
                  name
                )}`}
                alt={name}
              />
              <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jack Smith.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="You are a help full math teacher help me to solve problems..."
                      {...field}
                    />
                  </FormControl>
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
  );
};
