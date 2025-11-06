import React, { useContext, useEffect, useState } from "react";
import { VariableContext } from "../Context/Variable";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Quiz() {
    const { quizName } = useParams();
    const { baseUrl } = useContext(VariableContext);

    const [quizs, setQuiz] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [message, setMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [totalQuiz, setTotalQuiz] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [attempted, setAttempted] = useState(false);
    const [score, setScore] = useState({
        correct: 0,
        wrong: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const course = quizName.toLowerCase();
                const res = await axios.get(`${baseUrl}/add/quiz/get/${course}/quiz`);
                setQuiz(res.data.quiz);
                setTotalQuiz(res.data.quiz.length);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchData();
    }, [baseUrl, quizName]);

    if (quizs.length === 0) return <p>Loading...</p>;
    if (currentIndex >= quizs.length){
        return(
            <div className="flex flex-col items-center justify-center min-h-screen gap-6">
                <h2>{quizName.toUpperCase()} Completed! ✅</h2>
                <h1>Quiz</h1>
            </div>
        )   
    } 
    const currentQuiz = quizs[currentIndex];

    const handleAnswer = (option) => {
        if (attempted) return;

        setSelectedOption(option);
        setAttempted(true);

        if (option === currentQuiz.correctAnswer) {
            setMessage("Correct!");
            setIsCorrect(true);
            setScore(prev => ({
                ...prev,
                correct: prev.correct + 1
            }));
        } else {
            setMessage("Wrong!");
            setIsCorrect(true);
            setScore(prev => ({
                ...prev,
                wrong: prev.wrong + 1
            }));
        }
    };

    const NextBtn = () => {
        setMessage("");
        setIsCorrect(false);
        setSelectedOption("");
        setAttempted(false);
        setCurrentIndex(prev => prev + 1);
    };

    const getButtonClass = (option) => {
        if (!attempted) return "bg-white";
        if (option === currentQuiz.correctAnswer) return "bg-green-400"; // show correct
        if (option === selectedOption && selectedOption !== currentQuiz.correctAnswer) return "bg-red-400"; // show wrong
        return "bg-gray-300 cursor-not-allowed"; // disable others
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <h2 className="text-white font-bold text-2xl">
                <samp className={`${quizName.toLowerCase()}-font`}>{quizName.toUpperCase()}</samp> - Quiz
            </h2>
            <div className="border-2 border-black py-2 px-3 mx-auto w-11/12 md:w-2/5 rounded-2xl bg-slate-800">
                <div className="flex flex-row items-center justify-around mb-2">
                    <h5 className={`${quizName.toLowerCase()}-sub`}>
                        Total: <samp className="text-white font-bold">{totalQuiz}</samp>
                    </h5>
                    <div>
                        <h5 className="text-green-500">
                            Correct: <samp className="font-bold text-white">{score.correct}</samp>
                        </h5>
                        <h5 className="text-red-500">
                            Wrong: <samp className="font-bold text-white">{score.wrong}</samp>
                        </h5>
                    </div>
                </div>

                <h1 className={`${quizName.toLowerCase()}-sub text-xl font-bold my-2`}>
                    {currentIndex + 1} - {currentQuiz.quizQuestion}
                </h1>

                <div className="flex flex-col gap-2">
                    {["A", "B", "C", "D"].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => handleAnswer(opt)}
                            className={`allquiz-btn ${getButtonClass(opt)}`}
                            disabled={attempted}
                        >
                            {currentQuiz[`quizOption${opt}`]}
                        </button>
                    ))}
                </div>

                {message && (
                    <p className={selectedOption === currentQuiz.correctAnswer ? "text-green-500" : "text-red-500"}>
                        {message}
                    </p>
                )}

                <button
                    disabled={!isCorrect}
                    className={`mt-3 py-1 px-4 rounded ${
                        isCorrect
                            ? "cursor-pointer bg-blue-500 text-white"
                            : "cursor-not-allowed bg-gray-400 text-gray-700"
                    }`}
                    onClick={NextBtn}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
