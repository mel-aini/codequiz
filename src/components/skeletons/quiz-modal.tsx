import { useGlobalContext } from '@/app/_contexts/store';
import { Skeleton } from '@/components/ui/skeleton'

function QuizModalSkeleton() {
    const { state, dispatch } = useGlobalContext();
    
    return ( 
        <>
            <Skeleton 
                style={{backgroundColor: state.topicBgColor}}
                className="h-[150px] rounded-md relative" />
            <div className="w-full flex justify-center z-10">
                <div className="relative -mt-20 flex flex-col gap-2 items-center justify-center text-center bg-white border shadow-md w-3/4 min-h-[150px] p-10 rounded-xl">
                    <Skeleton className='bg-gray-200 h-3 w-3/4' />
                    <Skeleton className='bg-gray-200 h-3 w-full' />
                    <Skeleton className='bg-gray-200 h-3 w-2/4' />
                </div>
            </div>
            <div className="flex justify-center my-5">
                <div className="w-3/4 flex flex-col justify-center gap-2 select-none cursor-pointer">
                    <Skeleton className="w-full h-10 text-sm text-center border rounded-lg" />
                    <Skeleton className="w-full h-10 text-sm text-center border rounded-lg" />
                    <Skeleton className="w-full h-10 text-sm text-center border rounded-lg" />
                    <Skeleton className="w-full h-10 text-sm text-center border rounded-lg" />
                </div>
            </div>
            <div className="w-3/4 mx-auto flex gap-3 justify-center">
                <Skeleton className='w-full h-10 rounded-md bg-gray-400' />
            </div>
        </>
     );
}

export default QuizModalSkeleton;