"use client";

import { Loader } from "lucide-react";
import React from "react";

interface prpos {
  title: string;
  description: string;
}

export const LoadingState = ({ title, description }: prpos) => {
  return (
    <div className=" py-8 px-6 flex flex-1 items-center justify-center">
      <div className=" flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 ">
        <Loader className=" size-6 animate-spin" />
        <div className=" flex-col flex items-center text-center">
          <h5 className=" text-2xl font-medium text-muted-foreground/90 ">{title}</h5>
          <p className=" text-sm text-muted-foreground/50">{description}</p>
        </div>
      </div>
    </div>
  );
};
