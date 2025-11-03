import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Html() {
  const { name } = useParams();

  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    points: "",
    codeExample: "",
    explanation: "",
    level: "",
  });

  const [errors, setErrors] = useState({
    title: { message: "", required: false },
    description: { message: "", required: false },
    points: { message: "", required: false },
    codeExample: { message: "", required: false },
    explanation: { message: "", required: false },
    level: { message: "", required: false },
  });

  const isValid = () => {
    const tempError = {
      title: { message: "", required: false },
      description: { message: "", required: false },
      points: { message: "", required: false },
      codeExample: { message: "", required: false },
      explanation: { message: "", required: false },
      level: { message: "", required: false },
    };

    if (!lesson.title.trim()) {
      tempError.title.message = "Please enter the title";
      tempError.title.required = true;
    }

    if (!lesson.description.trim()) {
      tempError.description.message = "Please enter the description";
      tempError.description.required = true;
    }

    if (!lesson.points.trim()) {
      tempError.points.message = "Please enter bullet points";
      tempError.points.required = true;
    }

    if (!lesson.codeExample.trim()) {
      tempError.codeExample.message = "Please enter code example";
      tempError.codeExample.required = true;
    }

    if (!lesson.explanation.trim()) {
      tempError.explanation.message = "Please enter explanation";
      tempError.explanation.required = true;
    }

    if (!lesson.level.trim()) {
      tempError.level.message = "Please select a level";
      tempError.level.required = true;
    }

    setErrors(tempError);

    // if no error -> return true
    return !Object.values(tempError).some((field) => field.required);
  };

  const handleChanges = (e) => {
    setLesson({
      ...lesson,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid()) {
      console.log("✅ Lesson Added:", lesson);
      alert("Lesson Added Successfully!");
      // you can add API post request here later bro 👇
      // axios.post("/api/lesson", lesson)
    } else {
      console.log("❌ Validation Failed");
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
        {/* Title */}
        <input
          type="text"
          placeholder="Title of the lesson"
          className="inputs h-12"
          name="title"
          value={lesson.title}
          onChange={handleChanges}
        />
        {errors.title.required && (
          <p className="text-red-500 text-sm -mt-4">{errors.title.message}</p>
        )}

        {/* Description */}
        <textarea
          placeholder="Short overview of the lesson"
          className="inputs h-28"
          name="description"
          value={lesson.description}
          onChange={handleChanges}
        ></textarea>
        {errors.description.required && (
          <p className="text-red-500 text-sm -mt-4">
            {errors.description.message}
          </p>
        )}

        {/* Points */}
        <input
          type="text"
          placeholder="Bullet points"
          className="inputs h-12"
          name="points"
          value={lesson.points}
          onChange={handleChanges}
        />
        {errors.points.required && (
          <p className="text-red-500 text-sm -mt-4">{errors.points.message}</p>
        )}

        {/* Code Example */}
        <textarea
          placeholder="Code snippet example"
          className="inputs h-28 font-mono"
          name="codeExample"
          value={lesson.codeExample}
          onChange={handleChanges}
        ></textarea>
        {errors.codeExample.required && (
          <p className="text-red-500 text-sm -mt-4">
            {errors.codeExample.message}
          </p>
        )}

        {/* Explanation */}
        <textarea
          placeholder="Detailed explanation of the code example"
          className="inputs h-28"
          name="explanation"
          value={lesson.explanation}
          onChange={handleChanges}
        ></textarea>
        {errors.explanation.required && (
          <p className="text-red-500 text-sm -mt-4">
            {errors.explanation.message}
          </p>
        )}

        {/* Level */}
        <div className="flex flex-col w-full gap-2">
          <label
            htmlFor="level"
            className="font-semibold text-lg text-gray-300"
          >
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
        {errors.level.required && (
          <p className="text-red-500 text-sm -mt-4">{errors.level.message}</p>
        )}

        {/* Button */}
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
