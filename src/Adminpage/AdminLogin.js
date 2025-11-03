import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VariableContext } from "../Context/Variable"
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
  const { baseUrl } = useContext(VariableContext);
  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
        const res = await axios.post(`${baseUrl}/admin/login`,admin);
        if (res.data.success) navigate("/admin/home");
        else setMessage(res.data.message);
    }catch(err){
      console.log(err.message)
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
