"use client";
import ResponsiveDailog from "@/components/global/ResponsiveDailog";
import React from "react";
import { AgentFrom } from "./AgentFrom";
import { AgentGetOne } from "../../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: AgentGetOne;
}

export const UpdateAgentDailog = ({
  open,
  onOpenChange,
  initialValues,
}: Props) => {
  return (
    <ResponsiveDailog
      title=" Edit Agent"
      description="Edit the agent deatil"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentFrom
        onSuccess={() => onOpenChange(false)}
        onCancle={() => onOpenChange(false)}
        initialVale={initialValues}
      />
    </ResponsiveDailog>
  );
};
