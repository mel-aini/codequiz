import { getServerAuthSession } from "@/server/auth";
import User from "./user";
import { SidebarTrigger } from "./ui/sidebar";
  
async function Header() {
    const session = await getServerAuthSession();
    
    return ( 
        <div className="flex justify-between items-center py-5 pl-0 pr-8 sm:pr-10">
            <SidebarTrigger />
            <User img={session?.user.image || ''} />
        </div>
     );
}

export default Header;