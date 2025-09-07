"use client";

import React from "react";
import CommandSelect from "./CommandSelect";
import { useFilterHook } from "../../hooks/useFilterHook";
import { MeetingStatus } from "../../types";
import {
  CheckCircle2Icon,
  ClockArrowUpIcon,
  Loader2Icon,
  PlayCircleIcon,
  XCircleIcon,
} from "lucide-react";

interface Props {}

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize text-yellow-800 dark:text-yellow-300">
        <ClockArrowUpIcon className="text-yellow-800 dark:text-yellow-300" />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize text-blue-800 dark:text-blue-300">
        <PlayCircleIcon className="text-blue-800 dark:text-blue-300" />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize text-emerald-800 dark:text-emerald-300">
        <CheckCircle2Icon className="text-emerald-800 dark:text-emerald-300" />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize text-gray-800 dark:text-gray-300">
        <Loader2Icon className="animate-spin text-gray-800 dark:text-gray-300" />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize text-rose-800 dark:text-rose-300">
        <XCircleIcon className="text-rose-800 dark:text-rose-300" />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];


export const StatusFilter = () => {
  const [filter, setFilter] = useFilterHook();

  return (
    <CommandSelect
      placeholder="status"
      onSelect={(value) => setFilter({ status: value as MeetingStatus })}
      option={options}
      value={filter.status ?? ""}
      className="h-8"
    />
  );
};
