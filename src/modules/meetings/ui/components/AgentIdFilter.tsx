
'use client'
import React, { useState } from 'react'
import { useFilterHook } from '../../hooks/useFilterHook'
import CommandSelect from './CommandSelect';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { GenAvatarImage } from '@/components/global/GenAvatar';

export const AgentIdFilter = () => {
  const [filter , setFilter] = useFilterHook();
  const trpc = useTRPC();
  const [agentSearch, setAgentSearch] = useState('');
  const{data} = useQuery(trpc.meetings.getmany.queryOptions({
    pageSize : 100,
    search : agentSearch
  }))
  return (
   <CommandSelect
   className='h-8'
   placeholder='Agent'
   option={(data?.items ?? []).map((agent)=> ({
    id : agent.id,
    value : agent.id,
    children: (
        <div className=' flex items-center gap-x-1.5'>
            <GenAvatarImage name={agent?.name} />
            <p className=' text-sm text-accent-foreground'>{agent?.name}</p>
        </div>
    )
   }))}
   onSelect={(value)=> setFilter({agentId : value})}
   onSearch={setAgentSearch}
   value={filter.agentId ?? ""}
   />
  )
}


