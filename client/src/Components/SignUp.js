import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { signupEndpoint } from "../services/axiosInceptor";
const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateUsername = (username) => {
    return username.length >= 3;
  };

  const handleChange = (e) => {

    // it is used to validate the field
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
    } else if (fieldName === "username") {
      if (validateUsername(fieldValue)) {
        setErrors({ ...errors, [fieldName]: "" });
      } else {
        setErrors({
          ...errors,
          [fieldName]: "Username must be at least 3 characters long",
        });
      }
    }
  };
  const handleSubmit = (e) => {

    // it is used to send user data to servser
    e.preventDefault();
    axios
      .post(signupEndpoint, user)
      .then((res) => {
        console.log("res", res.data.message === "User registered successfully");
        if (res.data.message === "User registered successfully")
          toast.success("User registered successfully");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.data.message === "Email is already registered") {
          toast.error("Email is already registered");
        }
      });
  };
  return (
    // create signup field with error
    <div class="flex items-center justify-center h-screen">
      <div className="border-2 rounded-lg shadow-xl p-20">
        <div className=" text-2xl font-extrabold">FingerPrint App</div>
        <form>
          <div>
            <input
              className="border-2 w-25 border-black rounded p-2 m-2 "
              type="text"
              name="username"
              onChange={handleChange}
              value={user.username}
              required
              placeholder="Name"
            />
          </div>
          {errors.username && (
            <span className="error text-red-500">{errors.username}</span>
          )}
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
                SignUp
              </button>
            </div>
            <div>
              Click here for{" "}
              <Link to="/signin" className="text-indigo-500 underline">
                SignIn
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
