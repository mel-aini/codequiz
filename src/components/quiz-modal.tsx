"use client";

import { OPTIONS, useGlobalContext } from "@/app/_contexts/store";
import { api } from "@/trpc/react";
// import { TQuestion } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "./ui/modal";
import QuizModalSkeleton from "./skeletons/quiz-modal";
import Badge from "./badge";
import Button from "./custom-button";
import TopicCompleted from "@/app/(root)/dashboard/components/topic-completed";
import { useRouter } from "next/navigation";
import { Question } from "@prisma/client";

type TQuestion = Question & {
    options: string[]
}
  
function QuizModal() {
    const { state, dispatch } = useGlobalContext();
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [question, setQuestion] = useState<TQuestion | null>(null)
    const mutation = api.subscription.update.useMutation();
    const questionMutation = api.question.create.useMutation();
    const [isCorrect, setIsCorrect] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const router = useRouter();
    
    function reset() {
       setQuestion(null);
       setSelectedAnswer(null);
       setIsCorrect(false);
       setIsComplete(false);
    }

    useEffect(() => {
        if (selectedAnswer != null) {
            setIsCorrect(question?.correctAnswer == selectedAnswer);
        }
    }, [selectedAnswer])

    useEffect(() => {
        if (mutation.isSuccess) {
            dispatch({
                type: OPTIONS.IS_QUIZ_OPEN, 
                state: true, 
                topic: mutation.data, 
                bg: state.topicBgColor,
                image: state.topicImage
            })
            if (mutation.data?.isComplete) {
                setIsComplete(true);
            }
            
        }
    }, [mutation.isSuccess])

    useEffect(() => {
        generateQuestion();
        setIsComplete(state.activeSubscription?.isComplete ?? false)
    }, [state.activeSubscription])

    async function generateQuestion() {
        // generate question from Ai
        if (!state.activeSubscription) return;
    
        questionMutation.mutate({
            topicId: state.activeSubscription.topicId,
            difficulty: state.activeSubscription.difficulty,
            questionNumber: state.activeSubscription.questionNumber,
            totalQuestions: state.activeSubscription.totalQuestions
        });
    }

    useEffect(() => {
        if (questionMutation.isSuccess) {

            if (!questionMutation.data) return;
            try {
                console.log(questionMutation.data)
                // const generatedQuesion = JSON.parse(questionMutation.data);
                // console.log('correctAnswer: ', generatedQuesion.correctAnswer);
                setQuestion(questionMutation.data as TQuestion)
                
            } catch (error) {
                console.log()
            }
        }
    }, [questionMutation.isSuccess])

    function submitAnswer() {
        if (selectedAnswer == null || !isCorrect) return;
        mutation.mutate({id: state.activeSubscription?.id || ''})
        reset();
    }

    function closeModal() {
       dispatch({type: OPTIONS.IS_QUIZ_OPEN, state: false});
       reset();
       router.refresh();
    }

    function selectAnswer(index: number) {
        setSelectedAnswer(index);
    }

    return ( 
        <Modal isOpen={state.isQuizOpen} onClose={closeModal}>
            <div className="w-screen max-w-[600px] min-h-[200px] pb-10 overflow-hidden border-none rounded-md bg-white">
                {isComplete && <TopicCompleted close={closeModal} />}
                {!isComplete && (!question || questionMutation.isPending) && <QuizModalSkeleton />}
                {(!isComplete && question && !questionMutation.isPending) && <>
                    <div
                        style={{backgroundColor: state.topicBgColor}}
                        className="h-[150px] rounded-md relative">
                    </div>
                    <div className="w-full flex justify-center z-10">
                        <div className="relative -mt-20 flex items-center justify-center text-center bg-white border shadow-md w-3/4 min-h-[150px] px-10 pb-10 pt-16 rounded-xl">
                            <div className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[50px] h-[70px]">
                                <div className="relative h-full w-full">
                                    <Image fill alt="" src={state.topicImage} style={{objectFit: 'contain'}} />
                                </div>
                            </div>
                            <p>{question?.question}</p>
                            <div className="absolute top-0 left-0 w-full flex justify-between items-center p-3">
                                <Badge type={state.activeSubscription?.difficulty} />
                                <span className="text-[#002BFF]">Question {state.activeSubscription?.questionNumber}/{state.activeSubscription?.totalQuestions}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center my-5">
                        <div className="w-3/4 flex flex-col justify-center gap-2 select-none cursor-pointer">
                            {
                                question?.options.map((option, index) => {
                                    return (
                                        <div
                                            onClick={() => selectAnswer(index)}
                                            key={index} 
                                            className={"w-full px-2 py-2 text-sm text-center border rounded-lg \
                                            duration-300 " + ((index != selectedAnswer) ? '' : isCorrect ? 'border-green-500' : 'border-red-500')}>
                                                {option}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="w-3/4 mx-auto flex gap-3 justify-center">
                        <div className="w-full flex justify-center items-center">
                            <span
                                className="hover:underline cursor-pointer select-none text-sm"
                                onClick={closeModal}>
                                    Cancel
                            </span>
                        </div>
                        <Button
                            onClick={submitAnswer}
                            text="Next"
                            variant='fill'
                            disabled={selectedAnswer == null || !isCorrect}
                            className="w-full border" />
                    </div>
                    </>
                }
            </div>
        </Modal>

     );
}

export default QuizModal;