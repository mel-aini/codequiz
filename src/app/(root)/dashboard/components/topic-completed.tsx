import { Button } from "@/components/ui/button";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TopicCompleted({close}: {close: () => void}) {
    return ( 
        <div className="flex justify-center items-center">
            <div className="text-center pt-10">
            <h2 className="text-center text-2xl font-bold mb-5">Congratulations!</h2>
                <FontAwesomeIcon 
                        icon={faTrophy} 
                        className="text-yellow-500 text-7xl mb-5" 
                    />
                <p>you have completed the Quiz</p>
                <Button onClick={close} variant="outline" className="mt-5">
                    close
                </Button>
            </div>
        </div>
    );
}

export default TopicCompleted;