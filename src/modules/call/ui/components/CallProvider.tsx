"use client";

import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import React from "react";
import { CallConnect } from "./CallConnect";

interface Props {
  meetingId: string;
  meetingName: string;
}

export const CallProvider = ({ meetingName, meetingId }: Props) => {
  const { data, isPending } = authClient.useSession();
  if (!data || isPending) {
    return (
      <div className=" flex h-screen items-center justify-center w-full">
        <Loader className=" animate-spin" />
      </div>
    );
  }
  return (
    <CallConnect 
    meetingId={meetingId}
    meetingName={meetingName}
    userId={data.user.id}
    userImage={data.user.image || '/avatar.png'}
    userName={data.user.name}
    />
  );
};
