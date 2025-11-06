import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AllQuiz() {
    const navigator = useNavigate()
  return (
    <div className=' flex items-center justify-center min-h-screen flex-col'>

        <div className=' flex items-center justify-center min-h-screen flex-col'>
                <button className='html-btn'
                onClick={()=>navigator("/quiz/html")}
                >HTML</button>
                <button className='css-btn'
                onClick={()=>navigator("/quiz/css")}
                >CSS</button>
                <button className='javascript-btn'
                onClick={()=>navigator("/quiz/javascript")}
                >Javascript</button>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
        </div>
      
    </div>
  )
}
