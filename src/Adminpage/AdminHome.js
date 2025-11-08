import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminHome() {
  const navigate = useNavigate();
  const html = "html";
  const css = "Css";
  const Js = "JS";
  
  return (
    <div className=' flex items-center justify-center h-screen flex-col'>

      <h1 className=' text-2xl text-secondaryText font-bold'>Add lesson in...</h1>
      <div className=' flex flex-col items-center justify-center w-11/12 md:w-2/4'>
          <button
             className='html-btn w-1/2'
             onClick={()=>navigate(`/admin/home/${html}`)}
            >HTML</button>
          <button
           className='css-btn w-1/2'
           onClick={()=>navigate(`/admin/home/${css}`)}
          >CSS</button>
          <button
           className='javascript-btn w-1/2' 
           onClick={()=>navigate(`/admin/home/${Js}`)}
           >JS</button>
          <button
             className='mern-btn w-1/2'
               onClick={()=>navigate(`/admin/home/mern`)}
            >MERN</button>

            <button
              className='css-btn w-1/2'
              onClick={()=>navigate(`/admin/home/addquiz`)}
            >
              Add Quiz
            </button>
      </div>
      
    </div>
  )
}
///admin/home/mern