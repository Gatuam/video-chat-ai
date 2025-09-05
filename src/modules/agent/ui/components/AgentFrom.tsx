
'use client'
import React from 'react'
import { AgentGetOne } from '../../types';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface Props {
    onSuccess?: ()=> void;
    onError?: ()=> void;
    initialVale?: AgentGetOne;

}

export const AgentFrom = ({onSuccess, onError, initialVale}: Props) => {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient()

    const createAgent = useMutation(
        trpc.agent.create.mutationOptions({
            onSuccess:()=> {},
        })
    )
  return (
    <div>
      
    </div>
  )
}


