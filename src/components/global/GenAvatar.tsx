'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const GenAvatarImage = ({ name }: { name: string }) => {
  return (
    <Avatar className="cursor-pointer animate-pulse size-9 ">
      <AvatarImage
        className=" rounded-full"
        src={`https://api.dicebear.com/9.x/bottts/svg?seed=${encodeURIComponent(name)}`}
      />
      <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

