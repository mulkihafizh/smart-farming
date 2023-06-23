import React, { useState, useEffect } from "react";
import "../assets/css/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function RegisterPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      navigate("/dashboard");
      props.showToast("Anda Telah Login!", true);
    }
  }, [cookies.token, navigate, props]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || email === "" || password === "") {
      props.showToast("Semua field harus diisi!", true);

      return;
    }

    axios
      .post(
        process.env.REACT_APP_API_URL + "/user/signup",
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
        if (res.status) {
          navigate("/login");
          props.showToast("Register Berhasil!", false);
        }
      })
      .catch((err) => {});
  };

  return (
    <div id="register">
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
            <button className="textButton submitBtn" onClick={handleSubmit}>
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
