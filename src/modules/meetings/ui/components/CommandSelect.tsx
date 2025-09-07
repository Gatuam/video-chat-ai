"use client";

import React, { ReactNode, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  option: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

const CommandSelect = ({
  option,
  onSelect,
  onSearch,
  value,
  placeholder,
  isSearchable,
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = option.find((opt) => opt.value === value);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant={"outline"}
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronDown />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className=" text-muted-foreground text-sm">
              No options found
            </span>
          </CommandEmpty>
          {option.map((opt, i) => (
            <CommandItem
              key={i}
              onSelect={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
            >
              {opt.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};

export default CommandSelect;
