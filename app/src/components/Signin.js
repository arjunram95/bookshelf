import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Signin.css";
import axios from "axios";
// const LOGIN_URL = "/api/users/login";

const Signin = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const API_URL =
    "https://mern-book-shelf-arjunram-project.onrender.com/api/users/login";
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const signInUser = async (formData) => {
      try {
        const response = await axios.post(API_URL, formData);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate(from, { replace: true });
        }
        const { _id, name, email, token } = response.data;
        setAuth({ _id, name, email, token });
        console.log("auth: ", auth.name);
        console.log("response data: ", response.data);
        console.log("localstorage: ", localStorage.getItem("user"));
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
      }
    };
    console.log("React formData: ", formData);
    signInUser(formData);
  };
  return (
    <div className="signin">
      <section className="signin-heading">
        <h1>
          <FaSignInAlt /> Signin
        </h1>
        <p>Signin to your account</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Signin;
