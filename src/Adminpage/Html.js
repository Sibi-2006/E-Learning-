import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { VariableContext } from "../Context/Variable";

export default function Html() {
  const { name } = useParams();
  const { baseUrl } = useContext(VariableContext);
  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    points: "",
    codeExample: "",
    explanation: "",
    level: "",
    quizQuestion: "",
    quizOptionA: "",
    quizOptionB: "",
    quizOptionC: "",
    quizOptionD: "",
    correctAnswer: "",
  });

  const [errors, setErrors] = useState({});

  const isValid = () => {
    const tempError = {};

    if (!lesson.title.trim()) tempError.title = "Please enter Title";
    if (!lesson.description.trim()) tempError.description = "Please enter Description";
    if (!lesson.points.trim()) tempError.points = "Please enter Points";
    if (!lesson.codeExample.trim()) tempError.codeExample = "Please enter Code Example";
    if (!lesson.explanation.trim()) tempError.explanation = "Please enter Explanation";
    if (!lesson.level.trim()) tempError.level = "Please select Level";

    if (!lesson.quizQuestion.trim()) tempError.quizQuestion = "Please enter a quiz question";
    if (!lesson.quizOptionA.trim()) tempError.quizOptionA = "Option A is required";
    if (!lesson.quizOptionB.trim()) tempError.quizOptionB = "Option B is required";
    if (!lesson.quizOptionC.trim()) tempError.quizOptionC = "Option C is required";
    if (!lesson.quizOptionD.trim()) tempError.quizOptionD = "Option D is required";
    if (!lesson.correctAnswer.trim()) tempError.correctAnswer = "Select the correct answer";

    setErrors(tempError);
    return Object.keys(tempError).length === 0;
  };

  const handleChanges = (e) => {
    setLesson({
      ...lesson,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const courseName = name.toLowerCase();

      // Convert points string to array (split by new line or comma)
      const formattedLesson = {
        ...lesson,
        points: lesson.points
          .split(/\n|,/)
          .map((p) => p.trim())
          .filter((p) => p.length > 0),
      };

      try {
        const res = await axios.post(`${baseUrl}/addcourse/course/${courseName}`, formattedLesson);
        console.log(res.data);
        setLesson({
          title: "",
          description: "",
          points: "",
          codeExample: "",
          explanation: "",
          level: "",
          quizQuestion: "",
          quizOptionA: "",
          quizOptionB: "",
          quizOptionC: "",
          quizOptionD: "",
          correctAnswer: "",
        });
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log("❌ Validation failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-28 pb-10 px-4 bg-gradient-to-b from-[#0a0a0f] to-[#12121a] text-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Add Lesson for <span className="text-blue-400">{name}</span>
      </h1>

      <form
        className="flex flex-col gap-6 w-full max-w-3xl bg-[#1a1a25]/80 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.6)] border border-[#2b2b3b]"
        onSubmit={handleSubmit}
      >
        {/* Basic Fields */}
        <input
          type="text"
          placeholder="Title of the lesson"
          className="inputs h-12"
          name="title"
          value={lesson.title}
          onChange={handleChanges}
        />
        {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}

        <textarea
          placeholder="Short overview of the lesson"
          className="inputs h-28"
          name="description"
          value={lesson.description}
          onChange={handleChanges}
        ></textarea>
        {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}

        <textarea
          placeholder="Enter points (each point on new line or separated by commas)"
          className="inputs h-28"
          name="points"
          value={lesson.points}
          onChange={handleChanges}
        ></textarea>
        {errors.points && <p className="text-red-400 text-sm">{errors.points}</p>}

        <textarea
          placeholder="Code snippet example"
          className="inputs h-28"
          name="codeExample"
          value={lesson.codeExample}
          onChange={handleChanges}
        ></textarea>
        {errors.codeExample && <p className="text-red-400 text-sm">{errors.codeExample}</p>}

        <textarea
          placeholder="Detailed explanation of the code example"
          className="inputs h-28"
          name="explanation"
          value={lesson.explanation}
          onChange={handleChanges}
        ></textarea>
        {errors.explanation && <p className="text-red-400 text-sm">{errors.explanation}</p>}

        {/* Level */}
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="level" className="font-semibold text-lg text-gray-300">
            Level :
          </label>
          <select
            id="level"
            className="w-full h-12 px-4 rounded-xl bg-[#101018] border border-[#2e2e3e] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="level"
            value={lesson.level}
            onChange={handleChanges}
          >
            <option value="">--Level--</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        {errors.level && <p className="text-red-400 text-sm">{errors.level}</p>}

        {/* Quiz Section */}
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-400">Add Quiz</h2>

        <input
          type="text"
          placeholder="Quiz question"
          className="inputs h-12"
          name="quizQuestion"
          value={lesson.quizQuestion}
          onChange={handleChanges}
        />
        {errors.quizQuestion && <p className="text-red-400 text-sm">{errors.quizQuestion}</p>}

        <input
          type="text"
          placeholder="Option A"
          className="inputs h-12"
          name="quizOptionA"
          value={lesson.quizOptionA}
          onChange={handleChanges}
        />
        {errors.quizOptionA && <p className="text-red-400 text-sm">{errors.quizOptionA}</p>}

        <input
          type="text"
          placeholder="Option B"
          className="inputs h-12"
          name="quizOptionB"
          value={lesson.quizOptionB}
          onChange={handleChanges}
        />
        {errors.quizOptionB && <p className="text-red-400 text-sm">{errors.quizOptionB}</p>}

        <input
          type="text"
          placeholder="Option C"
          className="inputs h-12"
          name="quizOptionC"
          value={lesson.quizOptionC}
          onChange={handleChanges}
        />
        {errors.quizOptionC && <p className="text-red-400 text-sm">{errors.quizOptionC}</p>}

        <input
          type="text"
          placeholder="Option D"
          className="inputs h-12"
          name="quizOptionD"
          value={lesson.quizOptionD}
          onChange={handleChanges}
        />
        {errors.quizOptionD && <p className="text-red-400 text-sm">{errors.quizOptionD}</p>}

        <select
          name="correctAnswer"
          className="w-full h-12 px-4 rounded-xl bg-[#101018] border border-[#2e2e3e] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={lesson.correctAnswer}
          onChange={handleChanges}
        >
          <option value="">--Select Correct Answer--</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
          <option value="D">Option D</option>
        </select>
        {errors.correctAnswer && <p className="text-red-400 text-sm">{errors.correctAnswer}</p>}

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-md w-full"
        >
          Add Lesson
        </button>
      </form>
    </div>
  );
}
