import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VariableContext } from "../Context/Variable"
import axios from 'axios'

export default function Register() {

  const [user, setUser] = useState({ name: "", email: "", password: "" })
  const [errors, setErrors] = useState({
    name: { message: "", reqried: false },
    email: { message: "", reqried: false },
    password: { message: "", reqried: false }
  })
  const [serverError, setServerError] = useState("")
  const { baseUrl } = useContext(VariableContext)
  const navigate = useNavigate();

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const isValidElement = () => {
    const tempError = {
      name: { message: "", reqried: false },
      email: { message: "", reqried: false },
      password: { message: "", reqried: false }
    }

    if (!user.name.trim()) {
      tempError.name.message = "Enter UserName";
      tempError.name.reqried = true;
    }
    if (!user.email.trim()) {
      tempError.email.message = "Enter Email";
      tempError.email.reqried = true;
    }
    if (!user.password.trim()) {
      tempError.password.message = "Enter Password";
      tempError.password.reqried = true;
    }

    setErrors(tempError);
    if (tempError.password.reqried || tempError.email.reqried || tempError.name.reqried) {
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidElement()) return;

    try {
      const res = await axios.post(`${baseUrl}/register`, user);
      setServerError(res.data.message);
      setUser({ name: "", email: "", password: "" });
    } catch (err) {
      console.log(err.message);
      setServerError(err.response?.data?.message || "Server error occurred!");
    }
  }

  return (
    <div className='flex justify-center items-center h-screen flex-col'>
      <div className='mb-5 md:mb-10'>
        <button className='bg-white py-2 px-4 rounded-s-2xl text-dark font-bold'>Register</button>
        <button
          className='bg-primary py-2 px-4 rounded-e-2xl text-dark font-bold'
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>

      <form className='forms' onSubmit={handleSubmit}>
        <h2 className='form-title'>Register</h2>

        <input
          type="text"
          placeholder='UserName'
          className='form-inputs'
          name='name'
          value={user.name}
          onChange={handleChange}
        />
        {errors.name.reqried && <p className='errors'>{errors.name.message}</p>}

        <input
          type="email"
          placeholder='Email'
          className='form-inputs'
          name='email'
          value={user.email}
          onChange={handleChange}
        />
        {errors.email.reqried && <p className='errors'>{errors.email.message}</p>}

        <input
          type="password"
          placeholder='Password'
          className='form-inputs'
          name='password'
          value={user.password}
          onChange={handleChange}
        />
        {errors.password.reqried && <p className='errors'>{errors.password.message}</p>}

        {/* 👇 server response message */}
        {serverError.length > 0 && <p className='text-red-500 font-semibold mt-2'>{serverError}</p>}

        <p className='text-dark mt-2'>
          Have an account? <span className='text-accent'><Link to="/login">Login</Link></span>
        </p>

        <button className='forms-btn mt-3'>Register</button>
      </form>
    </div>
  )
}
