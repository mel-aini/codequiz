import { api } from "@/trpc/server";
import Subscription from "./subscription";

async function Subscriptions() {
    const subscriptions = await api.subscription.get();

    return ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {
                subscriptions.map((sub) => {
                    return (
                        <Subscription key={sub.id} data={sub} />
                    )
                })
            }
            {
                subscriptions.length == 0 && <p>your list is empty</p>
            }
        </div>
     );
}

export default Subscriptions;