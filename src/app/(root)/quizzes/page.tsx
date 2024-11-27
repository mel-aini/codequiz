import { api } from "@/trpc/server";
import Subscription from "../dashboard/components/subscription";

async function Topics() {
	const subscriptions = await api.subscription.get();
	return (
		<div>
			<h1 className="font-bold text-3xl mb-5">All My Quizzes</h1>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
				{
					subscriptions.map((sub, key) => {
						return (
							<Subscription
								key={key}
								className={"h-full"} 
                        		data={sub} 
							/>
						)
					})
				}
			</div>
		</div>
	);
}

export default Topics;