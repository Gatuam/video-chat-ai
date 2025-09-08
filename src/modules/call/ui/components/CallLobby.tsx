"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  onJoin: () => void;
}

const AllowBrowserPermission = () => {
  return (
    <p className=" text-sm">
      Please grant your browser a permission to access your camera and
      microphone.
    </p>
  );
};
const DisableVideoPreview = () => {
  const { data } = authClient.useSession();
  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user?.name ?? "",
          image: data?.user?.image || "/avatar.png",
        } as StreamVideoParticipant
      }
    />
  );
};

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();
  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const hasMediaPermission = hasCameraPermission && hasMicPermission;
  return (
    <div className=" flex flex-col items-center h-full ">
      <div className=" py-6 px-8 flex flex-1 items-center justify-center bg-accent-foreground/5 backdrop-blur-2xl rounded-md border border-accent-foreground/10 ">
        <div className=" flex flex-col items-center justify-center gap-y-6 shadow-2xl ">
          <div className=" flex flex-col gap-y-2 text-center">
            <h6 className=" text-lg font-medium">Ready to join?</h6>
            <p className=" text-sm ">Set up your call before joining</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasMediaPermission ? DisableVideoPreview : AllowBrowserPermission
            }
          />
          <div className=" flex gap-x-2">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className=" flex gap-x-2 justify-between w-full p-2">
            <Button asChild variant={"ghost"}>
              <Link href={"/meetings"}>Cancel</Link>
            </Button>
            <Button onClick={() => onJoin()} size={"sm"} variant={"secondary"}>
              <LogInIcon />
              Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
