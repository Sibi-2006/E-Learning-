import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AllQuiz() {
    const navigator = useNavigate()
  return (
    <div className=' flex items-center justify-center min-h-screen flex-col w-full'>
      
        <div className=' flex items-center justify-center min-h-screen flex-col md:w-5/12 w-11/12'>
        <h1 className=' text-4xl text-white font-bold my-4'>Quiz</h1>
                <button className='html-btn w-full'
                onClick={()=>navigator("/quiz/html")}
                >HTML</button>
                <button className='css-btn w-full'
                onClick={()=>navigator("/quiz/css")}
                >CSS</button>
                <button className='javascript-btn w-full'
                onClick={()=>navigator("/quiz/javascript")}
                >Javascript</button>

                <button className='mongodb-btn w-full'
                onClick={()=>navigator("/quiz/mongodb")}
                >Mongo-DB</button>

                <button className='express-btn w-full'
                onClick={()=>navigator("/quiz/express")}
                >Express</button>

                <button className='react-btn w-full' 
                onClick={()=>navigator("/quiz/react")}
                >React</button>

                <button className='node-btn w-full'
                onClick={()=>navigator("/quiz/node")}
                >Node</button>
                
        </div>
      
    </div>
  )
}
