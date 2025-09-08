import { EmptyState } from "@/components/global/EmptyState";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
interface Props {
  meetingId: string;
  onCancelling: () => void;
  isCancelling: boolean;
}

export const UpcomingState = ({
  meetingId,
  onCancelling,
  isCancelling,
}: Props) => {
  return (
    <div className="bg-accent-foreground/5 backdrop-blur-sm border border-accent-foreground/10 rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Not start yet!"
        description="Once you start this meeting, a summary will appear here"
      />
      <div className=" flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2.5 w-full">
        <Button
          disabled={isCancelling}
          onClick={onCancelling}
          className=" w-full lg:w-auto"
          variant={"secondary"}
        >
          <BanIcon />
          Cancel meeting
        </Button>
        <Button 
        disabled={isCancelling} 
        asChild 
        className=" w-full lg:w-auto  animate-pulse">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
