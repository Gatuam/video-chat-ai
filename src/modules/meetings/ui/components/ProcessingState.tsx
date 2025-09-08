import { EmptyState } from "@/components/global/EmptyState";
import { Button } from "@/components/ui/button";
import { Settings, VideoIcon } from "lucide-react";

export const ProcessingState = () => {
  return (
    <div className="bg-accent-foreground/5 backdrop-blur-sm border border-accent-foreground/10 rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/processing.svg"
        title="Meeting complete!"
        description="Summary will appear soon!"
      />
      <div className=" flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2.5 w-full">
        <Button className=" w-full lg:w-auto">
          <Settings className=" animate-spin" />
          Summarizing
        </Button>
      </div>
    </div>
  );
};
