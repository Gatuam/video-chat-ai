"use client";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import {
  PanelLeftClose,
  PanelLeftInactiveIcon,
  SearchIcon,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

import { DashboardCammand } from "./DashboardCammand";

export const DashboardNav = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { state, toggleSidebar, isMobile } = useSidebar();
 useEffect(()=> {
    const down = (e : KeyboardEvent)=> {
        if(e.key === 'k' && (e.metaKey || e.ctrlKey)){
            e.preventDefault();
            setOpen((pre)=> !pre)
        }
    }
    document.addEventListener('keydown', down);
    return ()=> document.removeEventListener('keydown', down)
 }, [])
  return (
    <>
      <DashboardCammand open={open} setOpen={setOpen} />
      <nav className=" flex px-4 gap-x-2 py-3 border-b bg-background justify-between">
        <div className=" flex ">
          <Button onClick={toggleSidebar} variant={"ghost"}>
            {state === "collapsed" || isMobile ? (
              <PanelLeftInactiveIcon />
            ) : (
              <PanelLeftClose />
            )}
          </Button>
          <Button
            onClick={() => {
              setOpen((pre) => !pre);
            }}
            className=" h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground/40 "
            variant={"outline"}
            size={"sm"}
          >
            <SearchIcon />
            <p className=" text-sm text-muted-foreground/40">Search</p>
            <kbd className=" ml-auto bg-accent-foreground/10 border border-accent-foreground/10 rounded-sm px-1 flex gap-1 py-[2px] text-muted-foreground/50">
              <span className=" text-[10px]">&#8984;</span>
              <p className=" text-[10px]">K</p>
            </kbd>
          </Button>
        </div>
        <ModeToggle />
      </nav>
    </>
  );
};
