import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [admin, setAdmin] = useState({
    adminId: "",
    password: "",
  });
  const navigate = useNavigate();
  const [ message , setMessage ] = useState("")
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   if (admin.adminId === process.env.ADMIN_ID && admin.password  === process.env.ADMIN_PASS) {
      navigate("/admin/home"); 
    } else {
      setMessage("Invalid Admin ID or Password ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <form className="forms" onSubmit={handleSubmit}>
        <h1 className="form-title">Admin Login</h1>

        <input
          type="text"
          placeholder="Admin ID"
          className="form-inputs"
          name="adminId"
          value={admin.adminId}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-inputs"
          name="password"
          value={admin.password}
          onChange={handleChange}
        />

        {message.length>0&&<p>{message}</p>}

        <button className="forms-btn">Go to Admin Page</button>
      </form>
    </div>
  );
}
