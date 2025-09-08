"use client";
import { DataTable } from "@/components/global/DataTable";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "../components/Colums";
import { useFilterHook } from "../../hooks/useFilterHook";
import { useRouter } from "next/navigation";
import { DataPagination } from "@/components/global/DataPagination";

export const MeetingsView = () => {
  const router = useRouter();
  const [filter, setFilter] = useFilterHook();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getmany.queryOptions({ ...filter })
  );
  return (
    <div className="flex-1 flex flex-col gap-y-3 md:px-6 px-4 py-3 w-full">
      <DataTable 
      columns={columns} 
      data={data.items} 
      isMeeting={true}
      onRowClick={(row)=> router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        pages={filter.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilter({ page })}
      />
    </div>
  );
};
