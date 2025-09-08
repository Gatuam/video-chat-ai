"use client";
import React, { useEffect, useState } from "react";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
  Call,
  CallingState,
} from "@stream-io/video-react-sdk";
import { useTRPC } from "@/trpc/client";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { CallUi } from "./CallUi";

interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}

export const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userImage,
  userName,
}: Props) => {
  const trpc = useTRPC();
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions()
  );
  const [client, setClient] = useState<StreamVideoClient>();
  useEffect(() => {
    const Client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    });
    setClient(Client);

    return () => {
      Client.disconnectUser();
      setClient(undefined);
    };
  }, [userId, userName, userImage, generateToken]);
  const [call , setCall] = useState<Call>();

  useEffect(()=> {
    if(!client) return 
    const _call = client.call('default', meetingId);
    _call.camera.disable();
    _call.microphone.disable();
    setCall(_call);

    return ()=> {
        if(_call.state.callingState !== CallingState.LEFT){
            _call.leave();
            _call.endCall();
            setCall(undefined);
        }
    }
  }, [client, meetingId])

  if(!call || !client){
    return (
        <div className=" flex h-screen items-center justify-center ">
            <Loader className=" size-6 animate-spin text-accent-foreground"/>
        </div>
    )
  }

  return <StreamVideo client={client} >
    <StreamCall call={call}>
        <CallUi
        meetingName={meetingName}
        />
    </StreamCall>
  </StreamVideo>;
};
