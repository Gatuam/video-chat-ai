import { EmptyState } from "@/components/global/EmptyState";
import { Button } from "@/components/ui/button";
import {  VideoIcon } from "lucide-react";
import Link from "next/link";
interface Props {
  meetingId: string;
}

export const ActiveState = ({ meetingId }: Props) => {
  return (
    <div className="bg-accent-foreground/5 backdrop-blur-sm border border-accent-foreground/10 rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Meeting is active!"
        description="Meeting will end when all the members are left"
      />
      <div className=" flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2.5 w-full">
        <Button asChild className=" w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
