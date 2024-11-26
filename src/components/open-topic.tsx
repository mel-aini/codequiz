"use client"

import { api } from '@/trpc/react';
import { OPTIONS, useGlobalContext } from '@/app/_contexts/store';
import { useEffect } from 'react';
import Button from './custom-button';

interface Props {
    id: string, 
    bgColor: string
    isComplete?: boolean,
    image: string
}

export default function OpenTopic({id, bgColor, isComplete, image}: Props) {
    const newSub = api.subscription.create.useMutation();
    const { dispatch } = useGlobalContext();

    async function requestTopic() {
        newSub.mutate({topicId: id})
    }
    
    useEffect(() => {
        if (newSub.isSuccess) {
            dispatch({
                type: OPTIONS.IS_QUIZ_OPEN, 
                state: true, 
                topic: newSub.data, 
                bg: bgColor,
                image: image
            })
        }
    }, [newSub.isSuccess])

    return (
        <Button
            disabled={isComplete}
            onClick={requestTopic}
            isLoading={newSub.isPending} />
    )
}