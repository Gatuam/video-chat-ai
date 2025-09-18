"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const CallEnd = () => {
  return (
    <div className=" flex flex-col items-center h-full ">
      <div className=" py-6 px-8 flex flex-1 items-center justify-center bg-accent-foreground/5 backdrop-blur-2xl rounded-md border border-accent-foreground/10 ">
        <div className=" flex flex-col items-center justify-center gap-y-6 shadow-2xl ">
          <div className=" flex flex-col gap-y-2 text-center">
            <h6 className=" text-lg font-medium">You have end the call</h6>
            <p className=" text-sm ">Summary will appear in a few minutes</p>
          </div>
          <Button className=" animate-pulse" asChild >
            <Link href={"/meetings"}>Back to mettings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
