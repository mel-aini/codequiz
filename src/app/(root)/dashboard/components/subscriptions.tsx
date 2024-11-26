import { api } from "@/trpc/server";
import Subscription from "./subscription";
import LastSubscription from "./latest-subscription";

async function Subscriptions() {
    const subscriptions = await api.subscription.get();

    return ( 
        <div className="flex flex-col xl:flex-row gap-10 xl:h-[350px]">
            {subscriptions[0] && 
                <LastSubscription
                    className="w-full xl:max-w-[450px]" 
                    data={subscriptions[0]} />}
            <div className="w-full h-full flex flex-col justify-between gap-10">
                {subscriptions[1] && 
                    <Subscription
                        className="h-full" 
                        data={subscriptions[1]} />}
                {subscriptions[2] && 
                    <Subscription
                        className="h-full" 
                        data={subscriptions[2]} />}
            </div>
            {
                subscriptions.length == 0 && <p>your list is empty</p>
            }
        </div>
     );
}

export default Subscriptions;