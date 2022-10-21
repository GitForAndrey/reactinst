import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FormInput } from "../ui_elements/formInput";
import { createUser, signInUser } from "../features/userSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value, name) => {
    if (name === "Email") {
      setEmail(value);
    }
    if (name === "Password") {
      setPassword(value);
    }
  };
  const handleCreateUser = (e) => {
    e.preventDefault();
    dispatch(createUser({ email, password }));
  };
  const handleSignInUser = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  return (
    <>
      <div className="loginContainer">
        <h2>Login</h2>
        <form name="form" onSubmit={(e) => handleSignInUser(e)}>
          <FormInput
            handleChange={handleChange}
            placeholder="Email"
            type="email"
          >
            <AiOutlineMail className="inputIcon" />
          </FormInput>
          <FormInput
            handleChange={handleChange}
            placeholder="Password"
            type="password"
          >
            <AiOutlineLock className="inputIcon" />
          </FormInput>

          <button className="postButton ">Log In</button>
          <Link to="/register" className="regLink">
            Register
          </Link>
        </form>
      </div>
      <div className="loginContainer">
        <h2>Register</h2>
        <form name="form" onSubmit={(e) => handleCreateUser(e)}>
          <FormInput
            handleChange={handleChange}
            placeholder="Username"
            type="text"
          >
            <AiOutlineMail className="inputIcon" />
          </FormInput>
          <FormInput
            handleChange={handleChange}
            placeholder="Password"
            type="password"
          >
            <AiOutlineLock className="inputIcon" />
          </FormInput>

          <button className="postButton">Register</button>
          <Link to="/login" className="regLink">
            Login
          </Link>
        </form>
      </div>
    </>
  );
};
