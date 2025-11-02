import React, { useContext } from 'react'
import{ VariableContext } from "../Context/Variable"
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const { appName } = useContext(VariableContext);
  const navigate = useNavigate();
  return (
    <div className=' fixed top-0 w-full'>
      <nav className=' bg-primary py-3 px-3 flex flex-row justify-between items-center '>
        <div>
          {/* I will add logo here */}
            <h1 className=' text-primaryText text-xl md:text-2xl font-bold'
              onClick={()=>navigate('/')}
            >
                {appName}
            </h1>
        </div>
            
        <button className=' primary-btn'
        onClick={()=>navigate('/register')}
        >
                register
        </button>
      </nav>
    </div>
  )
}
