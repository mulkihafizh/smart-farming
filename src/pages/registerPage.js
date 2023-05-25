import React from 'react'
import '../assets/css/register.css'

export default function RegisterPage() {
  return (
    
    <div id="register">

        <header className='registerHeader'>
        <div className="registerSection">
                    <p className="titleApp">Register</p>
                    <form>
                        <div className="formInput" >
                            <label className="username">Username</label>
                            <input placeholder="insert your email here" />
                        </div>
                        <div className="formInput" >
                            <label className="email">Email</label>
                            <input placeholder="insert your email here" />
                        </div>
                        <div className="formInput" >
                            <label className="password">Password</label>
                            <input placeholder="insert your email here" />
                        </div>
                       
                    </form>
                    <div className="button">
                        <a href={`/dashboard`}>
                            <button className="textButton">Login</button>
                        </a>
                    </div>
                    <p className="text">
                        Have an account?  <a href={`/login`}>Login</a>
                    </p>
                </div>
        </header>
    </div>


  );
}
