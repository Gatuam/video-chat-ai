import {  CommandDialog, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import React, { Dispatch, SetStateAction } from 'react'

interface Prpos {
    open : boolean;
    setOpen : Dispatch<SetStateAction<boolean>>
}

export const DashboardCammand = ({open, setOpen}: Prpos) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen} >
        <CommandInput
        placeholder=' Find video or agent'
        />
        <CommandList>
            <CommandItem>
                Test
            </CommandItem>
        </CommandList>
    </CommandDialog>
  )
}


