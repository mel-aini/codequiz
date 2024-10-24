import Topic from "@/components/topic";
import { api } from "@/trpc/server";



async function Topics() {
    const topics = await api.topic.get();

    return ( 
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
            topics.map((topic) => {
                return (
                    <Topic key={topic.id} className="border p-5 h-[250px]" topic={topic} />
                )
            })
        }
      </div>  
    );
}

export default Topics;