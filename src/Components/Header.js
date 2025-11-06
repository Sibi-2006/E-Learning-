import React, { useContext, useEffect, useState } from 'react'
import{ VariableContext } from "../Context/Variable"
import { useNavigate } from 'react-router-dom';
import { getUser } from '../storage';
export default function Header() {
  const { appName } = useContext(VariableContext);
  const navigate = useNavigate();
  const [ user, setUser] = useState([]);
  const [ userId , setUserId ] = useState("");
  useEffect(()=>{
    const setLocalData = ()=>{
      const local_user = getUser();
      setUser(local_user)
      setUserId(local_user.id);
    }
    setLocalData();
  },[]);


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
          {
            !userId?(<button className=' primary-btn'
          onClick={()=>navigate('/register')}
          >
                  register
          </button>) : <p>profile</p>
          }
        
      </nav>
    </div>
  )
}
