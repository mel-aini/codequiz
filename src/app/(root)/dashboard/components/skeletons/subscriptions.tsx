import { Skeleton } from "@/components/ui/skeleton";

function SubscriptionsSkeleton() {
	return ( 
		<div className="flex flex-col xl:flex-row gap-10 xl:h-[350px]">
			<Skeleton className="w-full xl:max-w-[450px] border rounded-xl bg-[#FAFAFA]" />
            <div className="w-full xl:h-full flex flex-col justify-between gap-10">
				<Skeleton className="h-full border rounded-xl bg-[#FAFAFA]" />
				<Skeleton className="h-full border rounded-xl bg-[#FAFAFA]" />
            </div>
        </div>
	);
}

export default SubscriptionsSkeleton;