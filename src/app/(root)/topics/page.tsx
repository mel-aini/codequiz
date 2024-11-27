import Topic from "@/components/topic";
import { api } from "@/trpc/server";

async function Topics() {
	const topics = await api.topic.get();
	return (
		<div>
			<h1 className="font-bold text-3xl mb-5">All Topics</h1>
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
				{
					topics.map((topic, key) => {
						return (
							<Topic key={key} className="border p-5 h-[250px] select-none" topic={topic} />
						)
					})
				}
			</div>
		</div>
	);
}

export default Topics;