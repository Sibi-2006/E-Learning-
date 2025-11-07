import React, { useContext, useEffect, useState } from 'react';
import { VariableContext } from "../../Context/Variable";
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams } from 'react-router-dom';
import { getUser } from '../../storage';

export default function HtmlCourse() {
  const { coueseName } = useParams(); // keep same as your param
  const [order, setOrder] = useState(1); 
  const { baseUrl } = useContext(VariableContext);
  const [lesson, setLesson] = useState({});
  const [copied, setCopied] = useState(false);
  const [quizResult, setQuizResult] = useState("");
  const [maxOrder, setMaxOrder] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userId, setUserId] = useState("");
  const [isNotMern, setIsNotMern] = useState(true);

  const course = coueseName.toLowerCase();

  // ✅ Fetch lesson by order
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(`${baseUrl}/addcourse/course/${course}/lessons/${order}`);
        setLesson(res.data.lesson);
        setQuizResult("");
        setIsCorrect(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    if (!isCompleted) fetchLesson();
  }, [baseUrl, course, order, isCompleted]);

  // ✅ Fetch Max Order once
  useEffect(() => {
    const fetchMaxOrder = async () => {
      try {
        const res = await axios.get(`${baseUrl}/addcourse/course/${course}/lessons/maxorder`);
        setMaxOrder(res.data.Max_order);
      } catch (err) {
        console.log("from getMaxOrder:", err.message);
      }
    };
    fetchMaxOrder();
  }, [baseUrl, course]);

  // ✅ Get user info from localStorage
  useEffect(() => {
    const localUser = getUser();
    if (localUser?.id) setUserId(localUser.id);
  }, []);

  // ✅ Fix isNotMern logic
  useEffect(() => {
    if (["mongodb", "react", "node", "express"].includes(course)) {
      setIsNotMern(false);
    } else {
      setIsNotMern(true);
    }
  }, [course]);

  // ✅ Copy Code
  const handleCopy = () => {
    if (!lesson.codeExample) return;
    navigator.clipboard.writeText(lesson.codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ Quiz check
  const checkAnswer = (option) => {
    if (!lesson.quiz) return;
    const correctAnswer = lesson.quiz.correctAnswer;
    if (option === correctAnswer) {
      setQuizResult("✅ Correct Answer! Great job bro 💪");
      setIsCorrect(true);
    } else {
      setQuizResult("❌ Wrong Answer! Try again bro 😅");
    }
  };

  // ✅ Next Lesson + Update Progress
  const nextLesson = async () => {
    if (order >= maxOrder) {
      setIsCompleted(true);
      return;
    }

    try {
      if (userId) {
        await axios.put(`${baseUrl}/progress/${userId}/${course}`, {
          completedLessons: order,
          totalLessons: maxOrder,
        });
      }
      setOrder(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.log("update progress error:", err);
    }
  };

  // ✅ Previous Lesson
  const prevLesson = () => {
    if (order > 1) {
      setOrder(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ✅ Completed Course View
  if (isCompleted) {
    return (
      <div className="flex flex-col items-start justify-start pl-6 pt-20 w-full text-white">
        <h1 className="text-5xl font-bold">🎉 Congratulations!</h1>
        <h3 className="text-2xl mt-3">
          You’ve completed the <span className={`${coueseName.toLowerCase()}-title font-bold`}>
            {coueseName.toUpperCase()}
          </span> course!
        </h3>
        <p className="mt-4 text-gray-400 text-lg">Keep learning and building projects bro 🚀</p>
      </div>
    );
  }

  // ✅ Main Lesson Page
  return (
    <div className="flex flex-col items-start justify-start pl-6 pt-20 w-full text-white">
      <h1 className="text-5xl md:text-6xl mb-2">
        Learn <span className={`${coueseName.toLowerCase()}-title font-bold`}>{coueseName.toUpperCase()}</span>
      </h1>
      <h2 className="text-2xl mb-1">
        Lesson - {order} : <span className={`font-bold ${coueseName.toLowerCase()}-font`}>{lesson.title}</span>
      </h2>
      <h3 className="text-gray-400 mb-4">
        Level - <span className="text-white">{lesson.level}</span>
      </h3>

      {/* Description */}
      <div className="mt-4">
        <h1 className={`text-xl font-semibold ${coueseName.toLowerCase()}-sub`}>Description :</h1>
        <p className="text-gray-300">{lesson.description}</p>
      </div>

      {/* Key Points */}
      <div className="mt-4">
        <h1 className={`text-xl font-semibold ${coueseName.toLowerCase()}-sub`}>Key Points :</h1>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          {lesson.points?.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Code Example */}
      <div className="mt-6 w-11/12 md:w-3/4 relative">
        <h1 className={`text-xl font-semibold ${coueseName.toLowerCase()}-sub`}>Example Code :</h1>
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

      {/* Live Output */}
      {isNotMern && lesson.codeExample && (
        <div className="mt-6 w-11/12 md:w-3/4">
          <h1 className={`text-xl font-semibold ${coueseName.toLowerCase()}-sub`}>Live Output :</h1>
          <iframe
            title="HTML Output"
            srcDoc={lesson.codeExample}
            className="w-full min-h-[200px] border border-gray-700 rounded-lg bg-gray-400"
          />
        </div>
      )}

      {/* Explanation */}
      <div className="mt-6">
        <h1 className={`text-xl font-semibold ${coueseName.toLowerCase()}-sub`}>Explanation :</h1>
        <p className="text-gray-300">{lesson.explanation}</p>
      </div>

      {/* Quiz */}
      <div className="mt-6">
        <h1 className={`text-xl font-semibold ${coueseName.toLowerCase()}-sub`}>Quiz :</h1>
        <h2 className="text-lg mb-2 text-gray-200">{lesson.quiz?.quizQuestion}</h2>
        <div className="flex flex-col gap-2">
          {["A","B","C","D"].map((opt) => (
            <button
              key={opt}
              onClick={() => checkAnswer(opt)}
              className={`bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-left`}
            >
              {opt} - {lesson.quiz?.[`quizOption${opt}`]}
            </button>
          ))}
        </div>
        {quizResult && <p className="mt-3 text-lg font-semibold">{quizResult}</p>}
      </div>

      <p className="mt-4">"Hit the correct answer 🎯 to move on!"</p>

      {/* Navigation */}
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
          disabled={!isCorrect}
          className={`${coueseName.toLowerCase()}-btn`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
