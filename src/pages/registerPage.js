import React, { useState, useEffect } from "react";
import "../assets/css/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Toast from "../components/toast";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cookies.token) {
      navigate("/dashboard");
    }
  }, [cookies.token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    if (username === "" || email === "" || password === "") {
      setIsError(true);
      setToastMessage("Please fill all the fields");
      setShowToast(true);
      setIsLoading(true);

      return;
    }

    axios
      .post(
        "https://smartfarming-api-mulkihafizh.vercel.app/smart-farming/signup",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setToastMessage(err.response.data.message);
        setShowToast(true);
        setIsLoading(true);
      });
  };

  return (
    <div id="register">
      {showToast && (
        <Toast
          isError={isError}
          message={toastMessage}
          setShowToast={setShowToast}
        />
      )}
      <header className="registerHeader">
        <div className="registerSection">
          <p className="registertitleApp">Register</p>
          <form className="authForm">
            <div className="formInput">
              <label className="username">Username</label>
              <input
                className="inputformfield"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="insert your email here"
              />
            </div>
            <div className="formInput">
              <label className="email">Email</label>
              <input
                className="inputformfield"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="insert your email here"
              />
            </div>
            <div className="formInput">
              <label className="password">Password</label>
              <input
                className="inputformfield"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="insert your email here"
              />
            </div>
          </form>
          <div className="button">
            <button className="textButton" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <p className="registertext">
            Have an account? <Link to={`/login`}>Login</Link>
          </p>
        </div>
      </header>
    </div>
  );
}
