import { Skeleton } from "@/components/ui/skeleton";

function TopicsSkeleton() {
	return ( 
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
			<Skeleton className="h-[250px] rounded-3xl border" />
			<Skeleton className="hidden lg:block h-[250px] rounded-3xl border" />
			<Skeleton className="hidden xl:block h-[250px] rounded-3xl border" />
		</div>
	);
}

export default TopicsSkeleton;