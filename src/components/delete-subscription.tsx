"use client"

import { api } from '@/trpc/react';
import { Button } from '@/components/ui/button';
import { twMerge } from 'tailwind-merge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
  
interface Props {
    id: string
}

export default function DeleteSubscription({id}: Props) {
    const sub = api.subscription.delete.useMutation();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    async function remove() {
        setIsOpen(false);
        sub.mutate({id: id})
    }

    useEffect(() => {
        if (sub.isSuccess) {
            router.refresh();
        }
    }, [sub.isSuccess])

    return (
        <>
        <Button
            onClick={() => setIsOpen(true)}
            disabled={sub.isPending}
            className={
                twMerge('flex gap-2 size-10 rounded-full bg-white')}>
            {!sub.isPending && 
                    <FontAwesomeIcon icon={faTrash} className='text-red-500' />}
            {sub.isPending && 
                <FontAwesomeIcon 
                icon={faCircleNotch}
                className='animate-spin text-[#0084FF]' />}
        </Button>
        <AlertDialog open={isOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this quiz and you will lose your progress.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-red-500 hover:bg-red-600 text-white hover:text-white' onClick={remove}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
        </>
    )
}