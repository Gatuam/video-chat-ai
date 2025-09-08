import { EmptyState } from "@/components/global/EmptyState";
import { Button } from "@/components/ui/button";
import { BanIcon } from "lucide-react";

export const CancelledState = () => {
  return (
    <div className="bg-accent-foreground/5 backdrop-blur-sm border border-accent-foreground/10 rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting is cancelled!"
        description="This Meeting was cancelled"
      />
      <div className=" flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2.5 w-full">
        <Button className=" w-full lg:w-auto" variant={"secondary"}>
          <BanIcon />
          Cancel meeting
        </Button>
      </div>
    </div>
  );
};
