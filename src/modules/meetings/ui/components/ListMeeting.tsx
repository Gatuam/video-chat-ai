"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { DEFAULT_PAGE } from "@/const/constant";
import { NewMeetingDailog } from "./NewMeetingDailog";
import { MeetingSearch } from "./MeetingSearch";
import { StatusFilter } from "./StatusFilter";
import { useFilterHook } from "../../hooks/useFilterHook";
// import { AgentIdFilter } from "./AgentIdFilter";

export const ListMeetings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useFilterHook();

  const isAnyFilterModified = !!filter.status || !!filter.search;

  const onClearFilter = () => {
    setFilter({
      search: "",
      page: DEFAULT_PAGE,
      status: null,
    });
  };
  return (
    <>
      <NewMeetingDailog onOpenChange={setIsOpen} open={isOpen} />
      <div className=" py-4 px-2 md:px-5 flex flex-col gap-y-4">
        <div className=" flex items-center justify-between  border-b px-4 py-3 bg-accent/30 backdrop-blur-2xl rounded-sm ">
          <h1 className=" text-2xl font-semibold">My Mettings</h1>
          <Button onClick={() => setIsOpen(true)}>
            <PlusIcon />
            New Mettings
          </Button>
        </div>
        <div className=" flex items-center gap-x-3 p-1">
          <MeetingSearch />
          <StatusFilter />
          {/* <AgentIdFilter /> */}
          {isAnyFilterModified && (
            <Button variant={"secondary"} size={"sm"} onClick={onClearFilter}>
              <XCircleIcon />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
