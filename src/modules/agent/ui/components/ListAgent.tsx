"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { NewAgentDailog } from "./NewAgentDailog";

export const ListAgent = () => {
  const [isOpen , setIsOpen] = useState(false)
  return (
    <>
    <NewAgentDailog onOpenChange={setIsOpen} open={isOpen}  />
    <div className=" py-4 px-2 md:px-5 flex flex-col gap-y-4">
      <div className=" flex items-center justify-between  border-b px-4 py-3 bg-accent/30 backdrop-blur-2xl rounded-sm ">
        <h1 className=" text-2xl font-semibold">My Agent</h1>
        <Button
        onClick={()=> setIsOpen(true)}
        >
          <PlusIcon/>
          New Agent
        </Button>
      </div>
    </div> 
    </>
   
  );
};
