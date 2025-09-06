"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { NewAgentDailog } from "./NewAgentDailog";
import { useFilterHook } from "../../hooks/useFilterHook";
import { AgentSearch } from "./AgentSearch";
import { DEFAULT_PAGE } from "@/const/constant";

export const ListAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter , setFilter] = useFilterHook();
    const isAnyFilterModified = !!filter.search;

  const onClearFilter = ()=> {
    setFilter({
        search : "",
        page: DEFAULT_PAGE
    })
  }
  return (
    <>
      <NewAgentDailog onOpenChange={setIsOpen} open={isOpen} />
      <div className=" py-4 px-2 md:px-5 flex flex-col gap-y-4">
        <div className=" flex items-center justify-between  border-b px-4 py-3 bg-accent/30 backdrop-blur-2xl rounded-sm ">
          <h1 className=" text-2xl font-semibold">My Agent</h1>
          <Button onClick={() => setIsOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <div className=" flex items-center gap-x-3 p-1">
          <AgentSearch/>
          {isAnyFilterModified && (
            <Button variant={'secondary'} size={'sm'}
            onClick={onClearFilter}>
              <XCircleIcon/>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
