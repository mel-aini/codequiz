import { getServerAuthSession } from "@/server/auth";
import User from "./user";
  
async function Header() {
    const session = await getServerAuthSession();
    
    return ( 
        <div className="flex justify-between items-center py-5">
            <h1 className="text-xl font-bold uppercase text-[#0084FF]" >CodeQuiz</h1>
            <User img={session?.user.image || ''} />
        </div>
     );
}

export default Header;