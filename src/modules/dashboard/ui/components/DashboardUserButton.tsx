import { authClient } from "@/lib/auth-client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronUp, CreditCard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const router = useRouter();
  const OnLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/sign-in");
        },
      },
    });
  };
  const { data, isPending } = authClient.useSession();
  if (isPending || !data?.user) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" rounded-lg border border-accent-foreground/20 p-3 py-4 w-full flex items-center justify-start bg-accent/50 overflow-hidden gap-3">
        {data?.user?.image ? (
          <Avatar>
            <AvatarImage src={data?.user?.image}></AvatarImage>
          </Avatar>
        ) : (
          <Avatar>
            <AvatarImage src={"/avatar.png"}></AvatarImage>
          </Avatar>
        )}
        {
          <div className="  not-first-of-type: flex flex-col w-full overflow-hidden">
            <p className=" text-start text-sm">{data?.user?.name}</p>
            <p className="text-xs tracking-tighter text-start text-accent-foreground/30">
              {data?.user?.email}
            </p>
          </div>
        }
        <ChevronUp className=" size-4 text-accent-foreground/40" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="top"
        className=" max-w-55 min-w-60"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className=" cursor-pointer flex items-center justify-between">
          Billing
          <CreditCard className=" cursor-pointer size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={OnLogout}
          className=" flex items-center justify-between"
        >
          Logout
          <LogOut className=" size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
