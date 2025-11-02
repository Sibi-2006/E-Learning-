import React from 'react'
import HTML from "./images/htmlImg.png"
import CSS from "./images/cssImg.png"
import JS from "./images/jsImg.png"
import MERN from "./images/MERN.webp"
const courses = [
  { 
    title: "HTML", 
    img: HTML, 
    desc: "HTML is the foundation of all web pages, used to structure and organize content on the internet.",
    style: "shadow-md shadow-orange-500 border-2 border-orange-500",
    reverse: false
  },
  { 
    title: "CSS", 
    img: CSS, 
    desc: "CSS (Cascading Style Sheets) is used to style and design web pages, controlling colors, layouts, and fonts.",
    style: "border-2 border-blue-400 shadow-md shadow-blue-400",
    reverse: true
  },
  {
    title:"JavaScript",
    img: JS,
    desc:"JavaScript (JS) is a programming language used to make web pages interactive and dynamic — it can handle animations, user inputs, and data updates without reloading the page.",
    style:"border-2 shadow-md border-yellow-400 shadow-yellow-400",
    reverse:false
  },
  {
    title:"MERN",
    img:MERN,
    desc:"MERN stands for MongoDB, Express, React, and Node.js — a powerful JavaScript stack used to build full-stack web applications from front-end to back-end.",
    style:"border-2 shadow-md border-green-400 shadow-green-400",
    reverse:true
  }
];

export default function AllCourse() {
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
            <button className={`${course.title.toLocaleLowerCase()}-btn`}>Learn {course.title} ➪ </button>
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
