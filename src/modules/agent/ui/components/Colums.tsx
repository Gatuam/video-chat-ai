"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AgentGetOne } from "../../types";
import { GenAvatarImage } from "@/components/global/GenAvatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "image",
    header: "Agent infomation",
    cell: ({ row }) => (
      <div className=" flex flex-col gap-y-2">
        <div className=" flex items-center gap-x-2">
          <GenAvatarImage name={row.original.name} />
          <span className=" text-sm font-semibold text-muted-foreground/90">{row.original.name}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "instructions",
    header: "instructions",
    cell: ({ row }) => (
      <div className=" flex flex-col gap-y-2">
        <div className=" flex items-center gap-x-2">
          <p className=" text-sm font-thin text-muted-foreground/40 truncate">{row.original.instructions}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Mettings",
    cell: ({ row }) => (
      <div className=" flex flex-col gap-y-2">
        <div className=" flex items-center gap-x-2">
          <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600 animate-pulse"
          >
            <VideoIcon/>
            <p className=" text-sm font-thin truncate line-clamp-1">1mettings</p>
          </Badge>
        </div>
      </div>
    ),
  },
];
