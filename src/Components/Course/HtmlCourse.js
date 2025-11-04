import React, { useContext, useEffect, useState } from 'react';
import { VariableContext } from "../../Context/Variable";
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams } from 'react-router-dom';

export default function HtmlCourse() {
  const { coueseName } = useParams()
  const [order, setOrder] = useState(1); 
  const { baseUrl } = useContext(VariableContext);
  const [lesson, setLesson] = useState({});
  const [copied, setCopied] = useState(false);
  const [quizResult, setQuizResult] = useState("");
  
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const couse = coueseName.toLowerCase();
        const res = await axios.get(`${baseUrl}/addcourse/course/${couse}/lessons/${order}`);
        setLesson(res.data.lesson);
        setQuizResult("")
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchLesson();
  }, [baseUrl, order]);

  const handleCopy = () => {
    if (!lesson.codeExample) return;
    navigator.clipboard.writeText(lesson.codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checkAnswer = (option) => {
    if (!lesson.quiz) return;
    const correctAnswer = lesson.quiz.correctAnswer;
    if (option === correctAnswer) {
      setQuizResult("✅ Correct Answer! Great job bro 💪");
    } else {
      setQuizResult("❌ Wrong Answer! Try again bro 😅");
    }
  };

  const nextLesson = () => {
  setOrder(prev => prev + 1);
  window.scrollTo({ top: 0, behavior: "smooth" }); 
};

const prevLesson = () => {
  if (order > 1) {
    setOrder(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }
};


  return (
    <div className="flex flex-col items-start justify-start pl-6 pt-20 w-full text-white">
      {/* Title */}
      <h1 className="text-5xl md:text-6xl mb-2">
        Learn <span className={`${coueseName.toLowerCase()}-title font-bold`}>{coueseName.toUpperCase()}</span>
      </h1>
      <h2 className="text-2xl mb-1">
        Lesson - {order} : <span className={` font-bold ${coueseName.toLowerCase()}-font`}>{lesson.title}</span>
      </h2>
      <h3 className="text-gray-400 mb-4">
        Level - <span className="text-white">{lesson.level}</span>
      </h3>

      {/* Description */}
      <div className="mt-4">
        <h1 className={`text-xl font-semibold ${coueseName.toLowerCase()}-sub `}>Description :</h1>
        <p className="text-gray-300">{lesson.description}</p>
      </div>

      {/* Key Points */}
      <div className="mt-4">
        <h1  className={`text-xl font-semibold ${coueseName.toLowerCase()}-sub `}>Key Points :</h1>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          {lesson.points?.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Code Example */}
      <div className="mt-6 w-11/12 md:w-3/4 relative">
        <h1  className={`text-xl font-semibold ${coueseName.toLowerCase()}-sub `}>Example Code :</h1>
        {lesson.codeExample && (
          <div className="relative">
            <button
              onClick={handleCopy}
              className="absolute right-3 top-3 bg-gray-700 text-white text-sm px-3 py-1 rounded-lg hover:bg-gray-600 transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <SyntaxHighlighter
              language="html"
              style={vscDarkPlus}
              customStyle={{
                borderRadius: "12px",
                padding: "16px",
                fontSize: "15px",
                backgroundColor: "#1e1e1e",
              }}
              wrapLongLines={true}
            >
              {lesson.codeExample}
            </SyntaxHighlighter>
          </div>
        )}
      </div>

      {/* (Optional) Live Preview */}
      
      <div className="mt-6 w-11/12 md:w-3/4">
        <h1  className={`text-xl font-semibold ${coueseName.toLowerCase()}-sub `}>Live Output :</h1>
        <iframe
          title="HTML Output"
          srcDoc={lesson.codeExample}
          className="w-full min-h-[200px] border border-gray-700 rounded-lg bg-gray-400"
        />
      </div>
     

      {/* Explanation */}
      <div className="mt-6">
        <h1  className={`text-xl font-semibold ${coueseName.toLowerCase()}-sub `}>Explanation :</h1>
        <p className="text-gray-300">{lesson.explanation}</p>
      </div>

      {/* Quiz Section */}
      <div className="mt-6">
        <h1  className={`text-xl font-semibold ${coueseName.toLowerCase()}-sub `}>Quiz :</h1>
        <h2 className="text-lg mb-2 text-gray-200">{lesson.quiz?.quizQuestion}</h2>
        <div className="flex flex-col gap-2">
          <button onClick={() => checkAnswer("A")} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-left">
            A - {lesson.quiz?.quizOptionA}
          </button>
          <button onClick={() => checkAnswer("B")} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-left">
            B - {lesson.quiz?.quizOptionB}
          </button>
          <button onClick={() => checkAnswer("C")} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-left">
            C - {lesson.quiz?.quizOptionC}
          </button>
          <button onClick={() => checkAnswer("D")} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-left">
            D - {lesson.quiz?.quizOptionD}
          </button>
        </div>

        {quizResult && (
          <p className="mt-3 text-lg font-semibold">
            {quizResult}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-6">
        <button 
          onClick={prevLesson} 
          disabled={order === 1}
          className={`${coueseName.toLowerCase()}-btn`}
        >
          Previous
        </button>

        <button 
          onClick={nextLesson} 
          className={`${coueseName.toLowerCase()}-btn`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
