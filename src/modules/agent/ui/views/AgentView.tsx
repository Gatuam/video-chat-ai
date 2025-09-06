"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { DataTable } from "../components/DataTable";
import { columns } from "../components/Colums";

export const AgentView = () => {
  const dataTable: any = [
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      email: "m@example.com",
    },
    // ...
  ];
  const trpc = useTRPC();
  const { data, isError } = useSuspenseQuery(trpc.agent.getmany.queryOptions());



  return (
    <div className=" flex-1 flex flex-col gap-y-4 md:px-11 px-8 py-6 w-full ">
      <DataTable data={data} columns={columns} />
    </div>
  );
};
