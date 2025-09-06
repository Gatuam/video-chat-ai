"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { DataTable } from "../components/DataTable";
import { columns } from "../components/Colums";
import { useFilterHook } from "../../hooks/useFilterHook";
import { DataPagination } from "../components/DataPagination";

export const AgentView = () => {
  const [filter, setFilter] = useFilterHook();
  const trpc = useTRPC();
  const { data, isError } = useSuspenseQuery(trpc.agent.getmany.queryOptions({...filter}));

  return (
    <div className=" flex-1 flex flex-col gap-y-3 md:px-6 px-4 py-3 w-full ">
      <DataTable data={data.items} columns={columns} />
      <DataPagination
      pages={filter.page}
      totalPages={data.totalPages}
      onPageChange={(page)=> setFilter({page})}
      />
    </div>
  );
};
