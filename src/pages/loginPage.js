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
  const [cookies, setCookie] = useCookies(["token"]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
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
      setToastMessage({ message: "Please fill all the fields", isError: true });
      setShowToast(true);
      setIsLoading(true);
      return;
    }

    axios
      .post(
        process.env.REACT_APP_API_URL + "/user/signin",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setCookie("toastMessage", "Login Berhasil", {
          path: "/",
        });
        navigate("/dashboard");
      })
      .catch((err) => {
        setToastMessage({
          message: err.response.data.error,
          isError: true,
        });
        setShowToast(true);
      });
    setIsLoading(false);
  };

  return (
    <div id="Login">
      {showToast && <Toast toast={toastMessage} />}
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
              className="Buttontext submitBtn"
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
