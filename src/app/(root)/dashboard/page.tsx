import { Suspense } from "react";
import Topics from "./components/topics";
import Subscriptions from "./components/subscriptions";

async function Dashboard() {
    return ( 
        <section>
            <div className="mt-10">
                <h1 className="text-3xl font-semibold mb-5">Available Quizzes</h1>
                <Suspense fallback={<span>loading...</span>}>
                    <Topics />
                </Suspense>
            </div>
            <div className="mt-10 mb-20">
                <h1 className="text-3xl font-semibold mb-5">My Quizzes</h1>
                <Suspense fallback={<span>loading...</span>}>
                    <Subscriptions />
                </Suspense>
            </div>
        </section>
    );
}

export default Dashboard;