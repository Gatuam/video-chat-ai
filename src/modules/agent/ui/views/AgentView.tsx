"use client";
import { ErrorState } from "@/components/global/ErrorState";
import { LoadingState } from "@/components/global/LoadingState";
import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

export const AgentView = () => {
  const trpc = useTRPC();
  const { data, isError } = useSuspenseQuery(
    trpc.agent.getmany.queryOptions()
  );

  if (isError) {
    return <ErrorState title="Failed to load Agents" description="Something went wrong!"/>;
  }

  return <div>wtf</div>;
};
