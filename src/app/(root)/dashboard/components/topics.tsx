import { api } from "@/trpc/server";
import TopicsData from "./topics-data";



async function Topics() {
    const topics = await api.topic.get();

    return ( 
      <TopicsData data={topics} />
    );
}

export default Topics;