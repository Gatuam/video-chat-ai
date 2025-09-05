"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { firstSections, secondSections } from "@/const";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./DashboardUserButton";

export const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className=" text-sidebar-accent-foreground flex justify-center items-center">
        <Link href={"/"} className=" flex items-center gap-2 pt-2">
          <Image src={"/logo.png"} height={30} width={30} alt="logo"></Image>
          <p className=" text-2xl font-semibold text-primary">Video-AI</p>
        </Link>
      </SidebarHeader>
      <div className=" px-4 py-2">
        <Separator className=" text-accent-foreground" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className=" space-y-1">
              {firstSections.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    asChild
                    className={` bg-sidebar-foreground/6 hover:bg-sidebar-accent-foreground/25 ${
                      pathname === item.herf &&
                      "bg-sidebar-accent-foreground/25"
                    }`}
                  >
                    <Link
                      href={item.herf}
                      className=" flex items-center  gap-2 "
                    >
                      <item.icon className=" size-5" />
                      <span className=" text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className=" px-4 py-2">
          <Separator className=" text-accent-foreground" />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className=" space-y-1">
              {secondSections.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    asChild
                    className={` bg-sidebar-foreground/6 hover:bg-sidebar-accent-foreground/25 ${
                      pathname === item.herf &&
                      "bg-sidebar-accent-foreground/25"
                    }`}
                  >
                    <Link
                      href={item.herf}
                      className=" flex items-center  gap-2 "
                    >
                      <item.icon className=" size-5" />
                      <span className=" text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className=" text-accent-foreground">
        <DashboardUserButton/>
      </SidebarFooter>
    </Sidebar>
  );
};
