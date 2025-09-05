'use client'
import ResponsiveDailog from '@/components/global/ResponsiveDailog';
import React from 'react'

interface Props {
    open: boolean;
    onOpenChange : (open : boolean) => void
}

export const NewAgentDailog = ({open , onOpenChange}: Props) => {

  return (
   <ResponsiveDailog
   title=' New Agent'
   description='Create a new agent'
   open={open}
   onOpenChange={onOpenChange}
   >
    new agent from
   </ResponsiveDailog>
  )
}

