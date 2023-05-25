import React from "react";
import "../assets/css/register.css";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div id="register">
      <header className="registerHeader">
        <div className="registerSection">
          <p className="titleApp">Register</p>
          <form>
            <div className="formInput">
              <label className="username">Username</label>
              <input placeholder="insert your email here" />
            </div>
            <div className="formInput">
              <label className="email">Email</label>
              <input placeholder="insert your email here" />
            </div>
            <div className="formInput">
              <label className="password">Password</label>
              <input placeholder="insert your email here" />
            </div>
          </form>
          <div className="button">
            <Link to={`/dashboard`}>
              <button className="textButton">Login</button>
            </Link>
          </div>
          <p className="registertext">
            Have an account? <Link to={`/login`}>Login</Link>
          </p>
        </div>
      </header>
    </div>
  );
}
