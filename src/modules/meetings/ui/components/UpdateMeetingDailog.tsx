"use client";
import ResponsiveDailog from "@/components/global/ResponsiveDailog";
import React from "react";
import { MeetingFrom } from "./MeetingFrom";
import { useRouter } from "next/navigation";
import { MeetingGetOne } from "../../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues : MeetingGetOne
}

export const UpdateMeetingDailog = ({ open, onOpenChange, initialValues }: Props) => {
  const router = useRouter();
  return (
    <ResponsiveDailog
      title="Edit Mettings"
      description="Edit the meeting detail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingFrom
        onSuccess={(id) => {
          onOpenChange(false);
        }}
        onCancle={() => onOpenChange(false)}
        initialVale={initialValues}
      />
    </ResponsiveDailog>
  );
};
