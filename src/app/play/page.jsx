"use client"

import { SmallHeader } from "@/components/SmallHeader"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { ChevronRightIcon, Clock4Icon } from "lucide-react"
import { useEffect, useState } from "react"

export default function Play() {

    const indexToLetter = (index) => {
        const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz");
        return alphabet[index];
    }

    const [question, setQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(1);

    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);

    const getQuestion = async () => {
        const res = await axios.post("/api/getQuestion");
        setQuestion(res.data.question);
    }

    const nextQuestion = () => {
        setUserAnswer(null);
        setQuestionNumber(o => o + 1);
        window.scrollTo({"top": 0});
        getQuestion();
    }

    useEffect(() => {
        if (!question) {
            getQuestion();
        }
    }, [])

    useEffect(() => {
        if (userAnswer != null) {
            if (question.correctAnswerIndex == userAnswer) {
                setCorrectAnswersCount(o => o + 1);
            }
            else {
                setIncorrectAnswersCount(o => o + 1);
            }
        }
    }, [userAnswer])

    return (
        <div className="flex flex-col">

            <SmallHeader/>

            <div className="flex flex-col self-center mt-36 max-w-[50rem] animate-fade-in">

                <div className="flex flex-row font-bold gap-x-8">
                    <div className="flex flex-col my-auto">
                        <span className="text-[#E7C654] text-4xl mr-8">Time-Based Practice</span>
                        <div className="flex flex-row gap-x-2">
                            <Clock4Icon className="my-auto" size={27} color="#FFF2C3"/>
                            <span className="text-2xl font-normal text-[#FFF2C3]">15 minutes</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-2 my-auto">
                        <Clock4Icon size={37}/>
                        <span className="text-4xl">6:05</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[#4BB268] text-4xl">{correctAnswersCount}</span>
                        <span className="text-xl">Correct</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[#C34646] text-4xl">{incorrectAnswersCount}</span>
                        <span className="text-xl">Incorrect</span>
                    </div>
                </div>

                <div className="w-full h-10 rounded-sm bg-[#0F0017] mt-6">
                    <div className="flex bg-[#1B002B] h-full w-fit rounded-l-sm">
                        <span className="text-2xl my-auto mx-2">{questionNumber}</span>
                    </div>
                </div>

                {(question) ? 
                
                    <div className="animate-fade-in">

                        <div className="flex flex-col gap-y-5 mt-4 text-xl">
                            <span>
                                {question.passage}
                            </span>
                            <span>
                                {question.prompt}
                            </span>
                        </div>

                        <div className="flex flex-col mt-5 gap-y-4">
                            {question.answerChoices.map((answerChoice, index) => (
                                <Button variant="outline" size="h-adapt" className={`w-full py-4 ${
                                    (() => {
                                        if (question.correctAnswerIndex == index && userAnswer != null) {
                                            return "bg-[#4BB268]";
                                        }
                                        else if (question.correctAnswerIndex != index && userAnswer == index) {
                                            return "bg-[#C34646]";
                                        }
                                    })()
                                }`} onClick={() => {setUserAnswer(index)}} disabled={userAnswer != null}>
                                    <div className="flex flex-row w-full">
                                        <div className="flex outline outline-1 aspect-square h-10 text-center rounded-full mr-4 my-auto">
                                            <span className="m-auto">
                                                {indexToLetter(index)}
                                            </span>
                                        </div>
                                        <span className="text-base font-normal text-left my-auto">
                                            {answerChoice}
                                        </span>
                                    </div>
                                </Button>
                            ))}
                        </div>

                        <div className="flex justify-center w-full m-5">
    
                            <Button className="w-fit m-3" disabled={userAnswer == null} onClick={nextQuestion}>
                                <span>Next</span>
                                <ChevronRightIcon/>
                            </Button>
        
                        </div>

                    </div>

                    :
                    
                    <></>
                }

            </div>

        </div>
    )

}