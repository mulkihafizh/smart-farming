import React, { useState, useEffect } from "react";
import "../assets/css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Toast from "../components/toast";

export default function LoginPage() {
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

    if (email === "" || password === "") {
      setIsError(true);
      setToastMessage("Please fill all the fields");
      setShowToast(true);
      setIsLoading(true);

      return;
    }

    axios
      .post(
        "https://smartfarming-api-mulkihafizh.vercel.app/smart-farming/signin",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status) {
          // navigate("/dashboard");
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setToastMessage(err.response.data.error);
        setShowToast(true);
      });
    setIsLoading(false);
  };

  return (
    <div id="Login">
      {showToast && <Toast message={toastMessage} isError={isError} />}
      <header className="LoginHeader">
        <div className="LoginSection">
          <p className="loginappTitle">Login Credential</p>
          <form className="authform">
            <div className="formInput">
              <label className="Email">Email</label>
              <input
                className="inputformfield"
                placeholder="insert your email here"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label className="Password">Password</label>
              <input
                className="inputformfield"
                placeholder="insert your email here"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
          <div className="button">
            <button
              onClick={handleSubmit}
              className="Buttontext"
              disabled={isLoading}
            >
              Login
            </button>
          </div>
          <p className="Text">
            Doesn't have an account? <Link to={`/register`}>Register</Link>
          </p>
        </div>
      </header>
    </div>
  );
}
