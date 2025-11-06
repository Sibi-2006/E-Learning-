import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VariableContext } from "../Context/Variable";
import axios from "axios";
import { setToken , SetUser} from "../storage";

export default function Log_in() {
  const navigate = useNavigate();
  const { baseUrl } = useContext(VariableContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: { message: "", reqried: false },
    password: { message: "", reqried: false },
  });

  const [serverMsg, setServerMsg] = useState("");

  const handleChanges = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isValidElement = () => {
    const tempError = {
      email: { message: "", reqried: false },
      password: { message: "", reqried: false },
    };

    if (!user.email.trim()) {
      tempError.email.message = "Enter Email";
      tempError.email.reqried = true;
    }
    if (!user.password.trim()) {
      tempError.password.message = "Enter Password";
      tempError.password.reqried = true;
    }

    setErrors(tempError);
    return !(tempError.email.reqried || tempError.password.reqried);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidElement()) return;

    try {
      
      const res = await axios.post(`${baseUrl}/login`, user);
      console.log(res.data);

      setToken(res.data.token);
      SetUser(res.data.user);

      setServerMsg(res.data.message); 
      setUser({ email: "", password: "" });

      
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setServerMsg(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="mb-5 md:mb-10">
        <button
          className="bg-primary py-2 px-4 rounded-s-2xl text-dark font-bold"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        <button className="bg-white py-2 px-4 rounded-e-2xl text-dark font-bold">
          Login
        </button>
      </div>

      <form className="forms" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="form-inputs"
          name="email"
          value={user.email}
          onChange={handleChanges}
        />
        {errors.email.reqried && <p className="errors">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          className="form-inputs"
          name="password"
          value={user.password}
          onChange={handleChanges}
        />
        {errors.password.reqried && <p className="errors">{errors.password.message}</p>}

        {serverMsg && (
          <p
            className={`mt-3 font-bold ${
              serverMsg.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {serverMsg}
          </p>
        )}

        <p className="text-dark">
          Don’t have an account?{" "}
          <span className="text-accent">
            <Link to="/register">Register</Link>
          </span>
        </p>

        <button className="forms-btn">Login</button>
      </form>
    </div>
  );
}
