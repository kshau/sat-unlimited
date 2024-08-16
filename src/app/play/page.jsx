"use client"

import { Footer } from "@/components/Footer"
import { SmallHeader } from "@/components/SmallHeader"
import { Button } from "@/components/ui/button"
import { indexToLetter } from "@/lib/utils"
import axios from "axios"
import { ChevronRightIcon, Clock4Icon, FileTextIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function Play() {

    const [question, setQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(1);

    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);

    const {selectedStudyMethod, selectedQuestionSubcats, selectedMinutes, selectedQuestionCount} = localStorage;

    const [clockValue, setClockValue] = useState(selectedStudyMethod == "time" ? `${selectedMinutes}:00` : "0:00");

    const [initialClockValue, setInitialClockValue] = useState(null);

    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    const getQuestion = async () => {
        const res = await axios.post("/api/getQuestion", {selectedQuestionSubcats});
        setQuestion(res.data.question);
    }

    const showResults = () => {
        localStorage.setItem("results", JSON.stringify({
            answeredQuestions, 
            time: selectedMinutes == "time" ? initialClockValue : clockValue, 
            correctAnswersCount, 
            incorrectAnswersCount
        }));
        location.href = "/results";
    }

    const nextQuestion = () => {

        if (selectedStudyMethod == "questions" && questionNumber >= selectedQuestionCount) {
            showResults();
            return;
        }

        setUserAnswer(null);
        setQuestionNumber(o => o + 1);
        window.scrollTo({"top": 0});
        getQuestion();
    }

    useEffect(() => {

        if (!question) {
            getQuestion();
        }

        const timeStarted = Date.now();

        if (selectedStudyMethod == "time") {
            // Written by ChatGPT
            const timerInterval = setInterval(() => {

                const endTime = timeStarted + selectedMinutes * 60_000;
                const timeDifference = endTime - Date.now();
                const newTime = new Date(timeDifference);
                const newClockValue = `${newTime.getMinutes()}:${newTime.getSeconds().toString().padStart(2, "0")}`;
                setClockValue(newClockValue);

                if (initialClockValue == null) {
                    setInitialClockValue(newClockValue);
                }

                if (newTime.getMinutes() == 0 && newTime.getSeconds() == 0) {
                    showResults();
                }

            }, 1000);
        }

        else {
            // Written by ChatGPT
            const stopwatchInterval = setInterval(() => {
                const timeDifference = Date.now() - timeStarted;
                const totalMinutes = Math.floor(timeDifference / 60_000);
                const seconds = Math.floor((timeDifference % 60_000) / 1000);
                const newClockValue = `${totalMinutes}:${seconds.toString().padStart(2, "0")}`;
                setClockValue(newClockValue);

            }, 1000);
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
            const answeredQuestion = question;
            answeredQuestion["userAnswerIndex"] = userAnswer;
            setAnsweredQuestions(o => [...o, answeredQuestion]);
        }
    }, [userAnswer])

    if (!selectedStudyMethod) {
        location.href = "/";
        return;
    }

    return (
        <div className="flex flex-col">

            <SmallHeader/>

            <div className="flex flex-col self-center mt-36 max-w-[50rem] animate-fade-in">

                <div className="sticky top-10 bg-background">

                    <div className="flex flex-row font-bold gap-x-6">
                        <div className="flex flex-col my-auto">
                            <span className="text-[#E7C654] text-3xl mr-8">{selectedStudyMethod == "time" ? "Time" : "Questions"}-Based Practice</span>
                            <div className="flex flex-row gap-x-2">
                                {selectedStudyMethod == "time" ? <Clock4Icon className="my-auto" size={27} color="#FFF2C3"/> : <FileTextIcon className="my-auto" size={27} color="#FFF2C3"/>}
                                <span className="text-2xl font-normal text-[#FFF2C3]">{selectedStudyMethod == "time" ? `${selectedMinutes} minutes` : `${selectedQuestionCount} questions`}</span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-x-2 my-auto">
                            <Clock4Icon size={33}/>
                            <span className={`text-3xl ${selectedStudyMethod == "time" && clockValue.startsWith("0:") ? "text-[#C34646]" : ""}`}>{clockValue}</span>
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

                </div>

                {(question) ? 
                
                    <div className="animate-fade-in" key={questionNumber}>

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

            <Footer/>

        </div>
    )

}