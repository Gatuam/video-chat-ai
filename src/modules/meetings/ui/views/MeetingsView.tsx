'use client'
import { useTRPC } from '@/trpc/client'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'

export const MeetingsView = () => {
    const trpc = useTRPC()
    const {data } = useSuspenseQuery(trpc.meetings.getmany.queryOptions({}))
  return (
    <div className='flex-1 flex flex-col gap-y-3 md:px-6 px-4 py-3 w-full'>
      {JSON.stringify(data)}
    </div>
  )
}


