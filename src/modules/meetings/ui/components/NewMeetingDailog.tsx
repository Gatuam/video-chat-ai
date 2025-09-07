"use client";
import ResponsiveDailog from "@/components/global/ResponsiveDailog";
import React from "react";
import { MeetingFrom } from "./MeetingFrom";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetingDailog = ({ open, onOpenChange }: Props) => {
  const router = useRouter();
  return (
    <ResponsiveDailog
      title=" New Mettings"
      description="Create a new Mettings"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingFrom
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancle={() => onOpenChange(false)}
      />
    </ResponsiveDailog>
  );
};
