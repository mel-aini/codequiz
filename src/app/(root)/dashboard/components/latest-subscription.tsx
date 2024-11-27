import { api } from "@/trpc/server";
import "./progress-circle.css"
import { TopicTitle } from "@/components/topic";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "@/components/badge";
import OpenTopic from "@/components/open-topic";
import DeleteSubscription from "@/components/delete-subscription";
import { Subscription } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import ProgressCircle from "./progress-circle";

interface Props {
	data: Subscription
	className?: string
}

async function LastSubscription({data, className}: Props) {
	const topic = await api.topic.getOne({id: data.topicId})
    return ( 
        <div className={twMerge("rounded-xl bg-[#FAFAFA] border p-5 flex flex-col gap-5 h-full justify-between", className)}>
            <div className="flex justify-between items-start sm:items-center">
                <div className="flex gap-5 items-center">
                <TopicTitle>{topic?.name}</TopicTitle>
                    {data.isComplete && <FontAwesomeIcon 
                        icon={faTrophy} 
                        className="text-yellow-500 text-3xl" 
                    />}
                </div>
				<div className="flex gap-2">
					<OpenTopic isComplete={data.isComplete} id={topic?.id || ''} bgColor={topic?.brandColor || ''} image={topic?.image || ''} />
					<DeleteSubscription id={data.id} />
				</div>
            </div>
			<ProgressCircle data={data} />
			 <div className="flex">
				<Badge type={data.difficulty} isComplete={data.isComplete} className="py-2" />
			 </div>
        </div>
    );
}

export default LastSubscription;