import React from "react";
import '../assets/css/login.css';

export default function LoginPage() {
    return (
        <div id="Login">
            <header className="LoginHeader">
                <div className="LoginSection">
                    <p className="appTitle">Login Credential</p>
                    <form>
                        <div className="formInput" >
                            <label className="Email">Email</label>
                            <input placeholder="insert your email here" />
                        </div>
                        <div className="formInput" >
                            <label className="Password">Password</label>
                            <input placeholder="insert your email here" />
                        </div>
                    </form>
                    <div className="button">
                        <a href={`/dashboard`}>
                            <button className="Buttontext">Login</button>
                        </a>
                    </div>
                    <p className="Text">
                        Doesn't have an account?  <a href={`/register`}>Register</a>
                    </p>
                </div>
            </header>
        </div>
    );
}