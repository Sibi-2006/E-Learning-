import React, { useContext, useEffect, useState } from "react";
import { VariableContext } from "../Context/Variable";
import axios from "axios";

export default function Quiz() {
    const { baseUrl } = useContext(VariableContext);
    const [quizs, setQuiz] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ message , setMessage ] = useState("");
    const [ isCorrect , setIsCorrect ] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/add/quiz/get/html/quiz`);
                setQuiz(res.data.quiz);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchData();
    }, [baseUrl]);

    if (quizs.length === 0) return <p>Loading...</p>;
    if (currentIndex >= quizs.length) return <p>Quiz Completed!</p>;

    const currentQuiz = quizs[currentIndex];

    const handleAnswer = (selected) => {
        if (selected === currentQuiz.correctAnswer) {
            setMessage("Correct!")
            setIsCorrect(!isCorrect)
        } else {
            setMessage("Wrong! Try again.");
           
        }
    };

    const NextBtn = ()=>{
        setMessage("")
        setIsCorrect(!isCorrect)
        setCurrentIndex(prev => prev + 1);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <h1 className="text-xl font-bold">
                {currentIndex+1} - {currentQuiz.quizQuestion}</h1>
            <div className="flex flex-col gap-3">
                <button onClick={() => handleAnswer("A")} className="btn">{currentQuiz.quizOptionA}</button>
                <button onClick={() => handleAnswer("B")} className="btn">{currentQuiz.quizOptionB}</button>
                <button onClick={() => handleAnswer("C")} className="btn">{currentQuiz.quizOptionC}</button>
                <button onClick={() => handleAnswer("D")} className="html-btn">{currentQuiz.quizOptionD}</button>
                {
                    message.length>0&&<p>{message}</p>
                }
                <button 
                disabled={!isCorrect}
                    className={`${isCorrect} ? "cursor-pointer" : "cursor-not-allowed" `}
                onClick={()=>NextBtn()}>Next </button>
            </div>
        </div>
    );
}
