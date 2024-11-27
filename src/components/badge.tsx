import { Difficulty } from "@prisma/client";
import { twMerge } from "tailwind-merge";

interface Props {
    type?: Difficulty,
    className?: string
    isComplete?: boolean
}

function Badge({className, type, isComplete}: Props) {
    if (!type) return null;
    return ( 
        <span 
            className={twMerge('px-3 py-1 flex justify-center items-center rounded-full font-normal text-sm text-[#002BFF] lowercase ',
            (isComplete ? 'bg-[gold] text-black' : type == 'BEGINNER' ? 'bg-[#E0EC9A]' : 
            type == 'INTERMEDIATE' ? 'bg-[#9AECB3]' :  'bg-[#9ACAEC]'),
             className)}>
            {isComplete ? 
                <span>completed</span> : 
                <span>{type}</span>}
        </span>
     );
}

export default Badge;