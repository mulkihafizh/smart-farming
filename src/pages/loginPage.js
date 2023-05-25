import React from "react";
import "../assets/css/login.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div id="Login">
      <header className="LoginHeader">
        <div className="LoginSection">
          <p className="appTitle">Login Credential</p>
          <form>
            <div className="formInput">
              <label className="Email">Email</label>
              <input placeholder="insert your email here" />
            </div>
            <div className="formInput">
              <label className="Password">Password</label>
              <input placeholder="insert your email here" />
            </div>
          </form>
          <div className="button">
            <Link to={`/dashboard`}>
              <button className="Buttontext">Login</button>
            </Link>
          </div>
          <p className="Text">
            Doesn't have an account? <Link to={`/register`}>Register</Link>
          </p>
        </div>
      </header>
    </div>
  );
}
