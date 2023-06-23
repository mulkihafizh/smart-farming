import React, { useState, useEffect } from "react";
import "../assets/css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cookies.token) {
      navigate("/dashboard");
      props.showToast("Anda Telah Login!", true);
    }
  }, [cookies.token, navigate, props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    if (email === "" || password === "") {
      props.showToast("Email dan Password tidak boleh kosong!", true);
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
        setCookie("token", res.data.token, {
          path: "/",
          maxAge: 36000,
          sameSite: "none",
          secure: true,
        });
        setCookie("userId", res.data.user._id, {
          path: "/",
        });
        props.showToast("Login Berhasil!", false);
        navigate("/dashboard");
      })
      .catch((err) => {
        props.showToast("Login Gagal!", true);
      });
    setIsLoading(false);
  };

  return (
    <div id="Login">
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
