import Badge from "@/components/badge";
import DeleteSubscription from "@/components/delete-subscription";
import OpenTopic from "@/components/open-topic";
import { TopicTitle } from "@/components/topic";
import { api } from "@/trpc/server";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Subscription as TSubscription } from "@prisma/client";
import { twMerge } from "tailwind-merge";

interface Props {
    data: TSubscription
    className?: string
}

async function Subscription({ data, className }: Props) {
    const topic = await api.topic.getOne({id: data.topicId})
    return ( 
        <div className={twMerge("rounded-xl bg-[#FAFAFA] border p-5 flex flex-col justify-between gap-10", className)}>
            <div className="flex justify-between items-start sm:items-center">
                <div className="flex gap-5 items-center">
                <TopicTitle>{topic?.name}</TopicTitle>
                    {data.isComplete && <FontAwesomeIcon 
                        icon={faTrophy} 
                        className="text-yellow-500 text-3xl" 
                    />}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Badge type={data.difficulty} className='order-2 sm:order-1' isComplete={data.isComplete} />
                    <div className="flex gap-2 order-1 sm:order-2">
                        <OpenTopic isComplete={data.isComplete} id={topic?.id || ''} bgColor={topic?.brandColor || ''} image={topic?.image || ''} />
                        <DeleteSubscription id={data.id} />
                    </div>
                </div>
            </div>
            <div className="relative w-full rounded-full h-3 bg-[#B9B9B9] overflow-hidden">
                <div
                    style={{left: `-${100 - (data.questionNumber / data.totalQuestions * 100) }%`}}
                    className="absolute top-0 w-full rounded-full h-3 bg-[#0084FF]" />
            </div>
        </div>
    );
}

export default Subscription;