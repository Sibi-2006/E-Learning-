import React, { useContext, useState } from 'react'
import { VariableContext } from "../Context/Variable"
import axios from "axios"
export default function AddQuiz() {

  const { baseUrl } = useContext(VariableContext)
  const [quiz , setQuiz ] = useState({
    quizQuestion:"",
    quizOptionA:"",
    quizOptionB:"",
    quizOptionC:"",
    quizOptionD:"",
    correctAnswer:"",
    category :"",
  });

  const [ errors , setErrors ] = useState({})

  const handleChanges = (e)=>{
    setQuiz({
      ...quiz,[e.target.name]:e.target.value
    })
  }

  const isValid = ()=>{
    const tempError = []

    if (!quiz.quizQuestion.trim()) tempError.quizQuestion = "Please enter a quiz question";
    if (!quiz.quizOptionA.trim()) tempError.quizOptionA = "Option A is required";
    if (!quiz.quizOptionB.trim()) tempError.quizOptionB = "Option B is required";
    if (!quiz.quizOptionC.trim()) tempError.quizOptionC = "Option C is required";
    if (!quiz.quizOptionD.trim()) tempError.quizOptionD = "Option D is required";
    if (!quiz.correctAnswer.trim()) tempError.correctAnswer = "Select the correct answer";
    if(!quiz.category.trim()) tempError.category = "Select the Category";

    setErrors(tempError);
    return Object.keys(tempError).length === 0;
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(isValid()){
        try{
            const res = await axios.post(`${baseUrl}/add/quiz/newquiz`,quiz);
            console.log(res.data);
            setQuiz({
              quizQuestion:"",
              quizOptionA:"",
              quizOptionB:"",
              quizOptionC:"",
              quizOptionD:"",
              correctAnswer:"",
              category :"",
            })
        }catch(err){
          console.log(err.message)
        }
    }
    
  }

  return (
    <div className=' flex items-center justify-center flex-col min-h-screen pt-28 overflow-y-auto pb-28'>
      <h1 className=' text-blue-300 text-2xl my-5'>Add Quiz..</h1>
      <form className=' flex items-center justify-center flex-col gap-5  border-2 border-violet-400 rounded-2xl p-4 w-11/12 md:w-1/2 bg-slate-500 backdrop-blur-md'
        onSubmit={handleSubmit}
      >

        <div className='w-full flex flex-row items-center justify-center ' >
            <label 
            
            htmlFor="category" 
            className=' text-2xl  font-bold mx-3'
            >Category : </label>
            <select 
            className="h-16 w-3/4 bg-blue-500 rounded-xl p-4"
            name="category"
            value={quiz.category}
            onChange={e=>handleChanges(e)}
            >
                <option value="">--Category--</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JS</option>
                <option value="mongodb">MongoDb</option>
                <option value="express">Express</option>
                <option value="react">React</option>
                <option value="node">Node</option>
            </select>
        </div>
        {
          errors.category&&<p className=' text-red-600'>{errors.category}</p>
        }
        <input 
            type="text"
            placeholder='Quiz question'
            className='inputs h-14'
            name='quizQuestion'
            value={quiz.quizQuestion}
            onChange={e=>handleChanges(e)}
         />
         {
          errors.quizQuestion&&<p className=' text-red-600'>{errors.quizQuestion}</p>
         }
         <input 
            type="text" 
            placeholder="Option A"
            className='inputs h-14'
            name='quizOptionA'
            value={quiz.quizOptionA}
            onChange={e=>handleChanges(e)}
        />
        {
          errors.quizOptionA&&<p className=' text-red-600'>{errors.quizOptionA}</p>
        }
        <input 
            type="text"
            placeholder="Option B"
            className='inputs h-14'
            name='quizOptionB'
            value={quiz.quizOptionB}
            onChange={e=>handleChanges(e)}
         />
         {
          errors.quizOptionB&&<p className=' text-red-600'>{errors.quizOptionB}</p>
        }
         <input 
            type="text"
            placeholder="Option C"
            className='inputs h-14'
            name='quizOptionC'
            value={quiz.quizOptionC}
            onChange={e=>handleChanges(e)}
         />
         {
          errors.quizOptionC&&<p className=' text-red-600'>{errors.quizOptionC}</p>
        }
         <input
            type="text"
            placeholder="Option D"
            className='inputs h-14'
            name='quizOptionD'
            value={quiz.quizOptionD}
            onChange={e=>handleChanges(e)}
         />
         {
          errors.quizOptionD&&<p className=' text-red-600'>{errors.quizOptionD}</p>
        }

          <select
          name="correctAnswer"
          className="w-full h-12 px-4 rounded-xl bg-[#101018] border border-[#2e2e3e] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={quiz.correctAnswer}
          onChange={e=>handleChanges(e)}
        >
          <option value="">--Select Correct Answer--</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
          <option value="D">Option D</option>
        </select>

        {
          errors.correctAnswer&&<p className=' text-red-600'>{errors.correctAnswer}</p>
        }

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-md w-full"
        >
          Add Quiz
        </button>
      </form>
    </div>
  )
}
