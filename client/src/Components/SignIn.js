import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { signinEndpoint } from "../services/axiosInceptor";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/userContext";

const SignIn = () => {
  // use context api in component
  const { setAuthentic, setUserInfo } = useContext(AuthContext);
  //   it is used to navigate
  const navigate = useNavigate();
  //   create user state
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // create error state
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // validation function
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  //   this is for changing data fields
  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUser({
      ...user,
      [fieldName]: fieldValue,
    });

    if (fieldName === "email") {
      if (validateEmail(fieldValue)) {
        setErrors({ ...errors, [fieldName]: "" });
      } else {
        setErrors({ ...errors, [fieldName]: "Please enter a valid email" });
      }
    } else if (fieldName === "password") {
      if (validatePassword(fieldValue)) {
        setErrors({ ...errors, [fieldName]: "" });
      } else {
        setErrors({
          ...errors,
          [fieldName]: "Password must be at least 6 characters long",
        });
      }
    }
  };

  //   it is used for sending form filed to server
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(signinEndpoint, user)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        // localStorage.setItem("user",JSON.stringify(res.data.user))
        // console.log("res", res);
        setAuthentic(true);
        setUserInfo(res.data.user);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.data.message === "Invalid email or password") {
          toast.error("Invalid email or password");
        }
      });
  };

  //   render signin fields
  return (
    <div class="flex items-center justify-center h-screen bg-blue-100 ">
      <div className="border-2 rounded-lg shadow-xl p-20">
        <div className=" text-2xl font-extrabold">FingerPrint App</div>
        <form>
          <div>
            <input
              className="border-2 w-auto border-black  rounded  p-2 m-2"
              type="text"
              name="email"
              onChange={handleChange}
              value={user.email}
              required
              placeholder="Email"
            />
          </div>
          {errors.email && (
            <span className="error text-red-500">{errors.email}</span>
          )}
          <div>
            <input
              className="border-2 w-auto border-black  rounded  p-2 m-2"
              type="password"
              name="password"
              onChange={handleChange}
              value={user.password}
              required
              placeholder="Password"
            />
          </div>
          {errors.password && (
            <span className="error text-red-500">{errors.password}</span>
          )}
          <div className="flex justify-center items-center">
            <div>
              <button
                className="bg-indigo-500 border rounded p-2 m-2 text-white"
                onClick={handleSubmit}
              >
                SignIn
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
