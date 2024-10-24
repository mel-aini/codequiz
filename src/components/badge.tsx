import { Difficulty } from "@prisma/client";
import { twMerge } from "tailwind-merge";

interface Props {
    type?: Difficulty,
    className?: string
}

function Badge({className, type}: Props) {
    if (!type) return null;
    return ( 
        <span 
            className={twMerge('px-3 py-1 flex justify-center items-center rounded-full font-normal text-sm text-[#002BFF] lowercase ' + (type == 'BEGINNER' ? 'bg-[#E0EC9A]' : 
            type == 'INTERMEDIATE' ? 'bg-[#9AECB3]' :  'bg-[#9ACAEC]'), className)}>
            {type}
        </span>
     );
}

export default Badge;