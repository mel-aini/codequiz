import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function QuizModalSkeleton() {    
    return ( 
        <div className='flex justify-center items-center h-[200px] mt-10'>
            <div className='flex flex-col justify-center gap-5'>
                <div className='text-center'>
                    <p>generating the question for you...</p>
                </div>
                <FontAwesomeIcon
                    className='animate-spin'
                    icon={faCircleNotch} />
            </div>
        </div>
     );
}

export default QuizModalSkeleton;