"use client";
import React from "react";
import { useFilterHook } from "../../hooks/useFilterHook";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export const AgentSearch = () => {
  const [filter, setFilter] = useFilterHook();

  return (
    <div className=" relative bg-accent rounded-md">
      <Input
        placeholder="Filter by name"
        className=" h-8 bg-accent w-full md:w-sm pl-9 "
        value={filter.search}
        onChange={(e) => setFilter({ search: e.target.value })}
      />
      <SearchIcon className=" size-4 absolute letf2 top-1/2 -translate-y-1/2 ml-3" />
    </div>
  );
};
