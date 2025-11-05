import React from 'react'

export default function AddQuiz() {
  return (
    <div className=' flex items-center justify-center flex-col min-h-screen pt-28 overflow-y-auto pb-28'>
      <h1 className=' text-blue-300 text-2xl my-5'>Add Quiz..</h1>
      <form className=' flex items-center justify-center flex-col gap-5  border-2 border-violet-400 rounded-2xl p-4 w-11/12 md:w-1/2 bg-slate-500 backdrop-blur-md'>

        <div className='w-full flex flex-row items-center justify-center ' >
            <label htmlFor="category" className=' text-2xl  font-bold mx-3'>Category : </label>
            <select 
            className="h-16 w-3/4 bg-blue-500 rounded-xl p-4"

            >
                <option value="">--Category--</option>
                <option value="">HTML</option>
                <option value="">CSS</option>
                <option value="">JS</option>
                <option value="">MongoDb</option>
                <option value="">Express</option>
                <option value="">React</option>
                <option value="">Node</option>
            </select>
        </div>
        <input 
            type="text"
            placeholder='Quiz question'
            className='inputs h-14'
         />
         <input 
            type="text" 
            placeholder="Option A"
            className='inputs h-14'
        />
        <input 
            type="text"
            placeholder="Option B"
            className='inputs h-14'
         />
         <input 
            type="text"
            placeholder="Option C"
            className='inputs h-14'
         />
         <input
            type="text"
            placeholder="Option D"
            className='inputs h-14'
         />

          <select
          name="correctAnswer"
          className="w-full h-12 px-4 rounded-xl bg-[#101018] border border-[#2e2e3e] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"

        >
          <option value="">--Select Correct Answer--</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
          <option value="D">Option D</option>
        </select>

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
