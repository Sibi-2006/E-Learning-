import React, { useContext, useEffect, useState } from 'react'
import { VariableContext } from "../../Context/Variable";
import axios from 'axios';

export default function HtmlCourse() {
    let order = 1;
    const { baseUrl } = useContext(VariableContext);
    const [ lesson , setLesson ] = useState([]);
    useEffect(()=>{
      const fetchLesson = async ()=>{
          try{
              const res = await axios.get(`${baseUrl}/addcourse/course/html/lessons/${order}`);
              console.log(res.data)
              setLesson(res.data.lesson);
          }catch(err){
            console.log(err.message)
          }
      }
      fetchLesson()
    },[baseUrl,order])
  return (
    <div>
      
    </div>
  )
}
