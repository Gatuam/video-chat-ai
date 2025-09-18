import { CallControls, SpeakerLayout } from '@stream-io/video-react-sdk';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
    onLeave : ()=> void;
    meetingName : string;
}

export const CallActive = ({onLeave, meetingName}: Props) => {
    
  return (
    <div className=' flex flex-col justify-between p-4 text-accent-foreground w-full'>
    <div className=' bg-accent rounded-full flex items-center gap-4 w-full'>
        <Link href={'/'} className=' flex items-center justify-center p-1 bg-accent-foreground/10 w-fit'>
        <Image
        className=' rounded-full'
        src={'/logo.png'}
        width={45}
        height={25}
        alt='logo'
        />
        </Link>
        <h4 className=' text-base'>
            {meetingName}
        </h4>
    </div>
    <SpeakerLayout/>
    <div className=' bg-accent rounded-full px-4'>
        <CallControls   onLeave={onLeave}/>
    </div>
    </div>
  )
}


