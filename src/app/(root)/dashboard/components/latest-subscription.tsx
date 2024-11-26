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
			<div className="flex justify-center relative">
                 <svg width="200" height="200" viewBox="0 0 250 250" className="circular-progress">
                     <circle className="bg"></circle>
                     <circle className="fg"></circle>
                 </svg>
				 <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 text-2xl font-medium">{35}%</span>
             </div>
			 <div className="flex">
				<Badge type={data.difficulty} isComplete={data.isComplete} className="py-2" />
			 </div>
            {/* <div className="relative w-full rounded-full h-3 bg-[#B9B9B9] overflow-hidden">
                <div
                    style={{left: `-${100 - (data.questionNumber / data.totalQuestions * 100) }%`}}
                    className="absolute top-0 w-full rounded-full h-3 bg-[#0084FF]" />
            </div> */}
        </div>
    );
	// return ( 
	// 		<div>
    //             <svg width="250" height="250" viewBox="0 0 250 250" className="circular-progress">
    //                 <circle className="bg"></circle>
    //                 <circle className="fg"></circle>
    //             </svg>
    //         </div>
	//  );
}

export default LastSubscription;