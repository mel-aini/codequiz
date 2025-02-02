import { Suspense } from "react";
import Topics from "./components/topics";
import Subscriptions from "./components/subscriptions";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopicsSkeleton from "./components/skeletons/topics";
import SubscriptionsSkeleton from "./components/skeletons/subscriptions";

async function Dashboard() {
    return ( 
        <section className="w-full">
            <div className="mt-10">
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl font-semibold">Available Quizzes</h1>
                    <div className="space-x-3 shrink-0">
                        <button id="prev-slide"
                            className="size-10 border rounded-full"
                            >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button id="next-slide"
                            className="size-10 border rounded-full"
                            >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
                <Suspense fallback={<TopicsSkeleton />}>
                    <Topics />
                </Suspense>
            </div>
            <div className="mt-10 mb-20">
                <h1 className="text-3xl font-semibold mb-5">My Quizzes</h1>
                <Suspense fallback={<SubscriptionsSkeleton />}>
                    <Subscriptions />
                </Suspense>
            </div>
        </section>
    );
}

export default Dashboard;