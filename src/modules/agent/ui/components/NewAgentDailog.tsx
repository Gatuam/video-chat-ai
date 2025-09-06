"use client";
import ResponsiveDailog from "@/components/global/ResponsiveDailog";
import React from "react";
import { AgentFrom } from "./AgentFrom";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAgentDailog = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDailog
      title=" New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentFrom
      onSuccess={()=> onOpenChange(false)}
      onCancle={()=> onOpenChange(false)}
      />
    </ResponsiveDailog>
  );
};
