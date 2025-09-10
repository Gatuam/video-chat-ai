"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MeetingGetMany } from "../../types";
import { GenAvatarImage } from "@/components/global/GenAvatar";
import { Badge } from "@/components/ui/badge";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  Loader,
  Loader2Icon,
  VideoIcon,
} from "lucide-react";
import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import { cn } from "@/lib/utils";

type Meeting = MeetingGetMany[number];

function formatDuration(second: number) {
  return humanizeDuration(second * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: Loader2Icon,
  completed: CircleCheckIcon,
  processing: Loader,
  cancled: CircleXIcon,
};
const statusColorMap = {
  upcoming:
    "bg-yellow-500/20 text-yellow-800 border-yellow-800/5 dark:bg-yellow-400/20 dark:text-yellow-300 dark:border-yellow-300/5",
  active:
    "bg-blue-500/20 text-blue-800 border-blue-800/5 dark:bg-blue-400/20 dark:text-blue-300 dark:border-blue-300/5",
  completed:
    "bg-emerald-500/20 text-emerald-800 border-emerald-800/5 dark:bg-emerald-400/20 dark:text-emerald-300 dark:border-emerald-300/5",
  cancelled:
    "bg-rose-500/20 text-rose-800 border-rose-800/5 dark:bg-rose-400/20 dark:text-rose-300 dark:border-rose-300/5",
  processing:
    "bg-gray-300/20 text-gray-800 border-gray-800/5 dark:bg-gray-600/20 dark:text-gray-300 dark:border-gray-300/5",
} as const;

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className=" flex flex-col gap-y-2">
        <div className=" flex items-center gap-x-2">
          <span className=" text-sm font-semibold text-muted-foreground/90">
            {row.original.agent.name}
          </span>
          <GenAvatarImage name={row.original.agent.name} />
          <span className=" text-sm  text-muted-foreground/50">
            {row.original.startedAt
              ? format(row.original.startedAt, "MMM d")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];

      return (
        <Badge
          variant="secondary"
          className={cn(
            "animate-pulse",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )}
        >
          <Icon
            className={cn(
              row.original.status === "processing" && "animate-spin"
            )}
          />

          <p className=" text-sm font-thin truncate line-clamp-1">
            {row.original.status}
          </p>
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Durations",
    cell: ({ row }) => (
      <div className=" flex flex-col gap-y-2">
        <div className=" flex items-center gap-x-2">
          <Badge
            variant="outline"
            className=" capitalize [&>svg]:size-4 flex items-center gap-x-2 animate-pulse"
          >
            <ClockFadingIcon className=" text-blue-600" />
            <p className=" text-sm font-thin truncate line-clamp-1">
              {" "}
              {row.original.duration
                ? formatDuration(row.original.duration)
                : "No duration"}{" "}
            </p>
          </Badge>
        </div>
      </div>
    ),
  },
];
