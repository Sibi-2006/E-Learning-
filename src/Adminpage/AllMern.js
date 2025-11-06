import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function AllMern() {
  const navigate = useNavigate();

  return (
    <div className=' flex flex-col items-center justify-center min-h-screen '>
         <div className=' flex flex-col items-center justify-center w-11/12 md:w-1/2'>
                      <button
                className='mongo-btn'
                onClick={()=>navigate(`/admin/home/mongo`)}
            >Mongo</button>
            <button
            className='express-btn'
            onClick={()=>navigate(`/admin/home/express`)}
            >Express</button>
            <button
            className='react-btn'
            onClick={()=>navigate(`/admin/home/react`)}
            >React</button>
            <button
            className='node-btn'
            onClick={()=>navigate(`/admin/home/node`)}
            >Node</button>
        </div>

    </div>
  )
}
