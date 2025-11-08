import React, { useContext } from 'react'
import { VariableContext } from "../Context/Variable"
import AllCourse from '../AllCourse'

export default function Home() {
  const { appName } = useContext(VariableContext)

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      
      <section className="snap-start h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="home-title mb-6">{appName}</h1>
        <p className="text-secondaryText max-w-3xl leading-relaxed">
          🚀 E-Learning App — a free platform that teaches HTML, CSS, JavaScript, and MERN stack step by step. <br />
          📘 Includes interactive lessons, sample codes etc..... <br />
          💡 Designed to help beginners become full-stack developers easily and effectively.
        </p>
      </section>
      <AllCourse />
    </div>
  )
}
