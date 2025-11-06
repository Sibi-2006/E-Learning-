import React from 'react'
import mongo from "../../images/mongo.png";
import express from "../../images/express.png";
import node from "../../images/node.png";
import react from "../../images/react.png";
import { useNavigate } from "react-router-dom"
const courses = [
  { 
    title: "MONGO", 
    img: mongo, 
    desc: "MongoDB is a NoSQL database that stores data in flexible JSON-like documents instead of tables.It’s great for scalability, speed, and handling unstructured data — perfect for modern web apps. 🚀",
    style: "shadow-md shadow-green-500 border-2 border-green-500",
    reverse: false
  },
  { 
    title: "EXPRESS", 
    img: express, 
    desc: "Express is a lightweight Node.js framework used to build web servers and APIs easily.It helps handle routes, requests, and responses with minimal code. ⚡",
    style: "shadow-md shadow-yellow-600 border-2 border-yellow-600",
    reverse: true
  },
  { 
    title: "REACT", 
    img: react, 
    desc: "React is a JavaScript library for building fast, dynamic user interfaces using reusable components. ⚛️It updates only what’s needed on the page, making web apps super smooth and efficient.",
    style: "shadow-md shadow-blue-500 border-2 border-blue-500",
    reverse: false
  },
  { 
    title: "NODE", 
    img: node, 
    desc: "Node.js is a runtime environment that lets you run JavaScript outside the browser, mainly on servers. ⚙️It’s great for building fast, scalable, and real-time applications using a single language — JavaScript.",
    style: "shadow-md shadow-orange-500 border-2 border-orange-500",
    reverse: true
  },
]
export default function MernHome() {
  const navigator = useNavigate();
  return (
    <div>
      {courses.map((course, index) => (
        <section 
          key={index} 
          className={`snap-start h-screen flex flex-col md:flex-row items-center justify-center md:justify-around px-10 ${course.reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}

        >
          <div className={`${course.title.toLowerCase()}-con con max-w-lg`}>
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-secondaryText">{course.desc}</p>
            <button className={`${course.title.toLocaleLowerCase()}-btn`}
              onClick={()=>navigator(`/learncourse/in/mern/${course.title.toLowerCase()}`)}
            >Learn {course.title} ➪ </button>
          </div>
          <div>
            <img 
              src={course.img} 
              className={`allCourse-img ${course.style}`} 
              alt={course.title} 
            />
          </div>
        </section>
      ))}
    </div>
  )
}
