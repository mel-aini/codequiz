import { Card } from '@/components/ui/card'
import { Topic as TopicType } from '@prisma/client';
import Image from "next/image";
import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';
import OpenTopic from './open-topic';

interface Props {
    topic: TopicType
    className?: string
}

function Topic({topic, className}: Props) {
    return ( 
        <Card
            style={{backgroundColor: topic.brandColor}} 
            className={twMerge('flex p-5 lg:p-8 rounded-3xl', className)}>
            <div className='flex flex-col justify-between'>
                <div className='space-y-4'>
                    <TopicTitle>{topic.name}</TopicTitle>
                    <p className='text-white'>{topic.text}</p>
                </div>
                <OpenTopic id={topic.id} bgColor={topic.brandColor} />
            </div>
            <div className='relative w-1/2 rotate-12'>
                <Image 
                    src={topic.image}
                    alt=""
                    fill
                    style={{ objectFit: 'contain' }}
                />
            </div>
        </Card>
    );
}

export default Topic;

interface TopicTitleProps {
    children: ReactNode
}

export function TopicTitle({children}: TopicTitleProps) {
    return (
        <div className='inline px-3 py-2 bg-black text-white rounded-full'>
            {children}
        </div>
    )
}