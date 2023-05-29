import React from "react";
import "../assets/css/landing.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function LandingPage() {
  const [cookies] = useCookies(["token"]);

  return (
    <div id="landing">
      <header className="landingHeader">
        <div className="landingSection">
          <p className="appTitle">Smart Farming</p>
          <div className="mainHeader">
            <p className="bigText">Smart Farming Tracker</p>
            <p className="mediumText">
              Check All Users <span>Here!</span>
            </p>
            <p className="smallText">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley.
            </p>
            <div className="headerButton">
              {cookies.token ? (
                <Link to={`/dashboard`}>
                  <button className="redirectButton">Maps</button>
                </Link>
              ) : (
                <Link to={`/register`}>
                  <button className="redirectButton">Start</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="card-container">
        <h1 className="card-heading">For your Information</h1>
        <div className="card-content">
          <div className="card">
            <span class="tag">Feature</span>
            <h2 className="card-title">Title</h2>
            <div className="card-info">
              <p className="info">
                Elemenatary tracks all the events for the day as you scheduled
                and you will never have to worry.
              </p>
            </div>
          </div>
          <div className="card">
            <span class="tag">Feature</span>
            <h2 className="card-title">Title</h2>
            <div className="card-info">
              <p className="info">
                Elemenatary tracks all the events for the day as you scheduled
                and you will never have to worry.
              </p>
            </div>
          </div>
          <div className="card">
            <span class="tag">Feature</span>
            <h2 className="card-title">Title</h2>
            <div className="card-info">
              <p className="info">
                Elemenatary tracks all the events for the day as you scheduled
                and you will never have to worry.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="sb__footer section-padding">
          <div className="sb__footer-link">
            <div className="sb__footer-link-div">
              <h4>For Business</h4>
              <a href="/">
                <p>Employer</p>
              </a>
              <a href="/">
                <p>Health plan</p>
              </a>
              <a href="/">
                <p>Individual</p>
              </a>
            </div>
            <div className="sb__footer-link-div">
              <h4>Head Office</h4>
              <a href="/">
                <p>
                  Jl. Pelajar Pejuang 45 No.65,Lkr. Sel.,Lengkong,Kota
                  Bandung,Jawa Barat 40263 Lkr. Sel., Kec. Lengkong, Kota
                  Bandung, Jawa Barat 40264
                </p>
              </a>
            </div>
            <div className="sb__footer-link-div">
              <h4>Contact</h4>
              <a href="/">
                <p>
                  Nomer Telfon (Kantor Utama): (022) 7351 6650 Email:
                  pt.lskk@gmail.comh
                </p>
              </a>
            </div>
            <div className="sb__footer-link-div">
              <h4>Workshop</h4>
              <a href="/">
                <p>
                  Jl. Punclut No. 516 Ciumbeuleuit, Kec. Cidadap, Kota Bandung,
                  Jawa Barat, 40142
                </p>
              </a>
              <a href="/">
                <p>Nomer Telfon (Workshop): (022) 7302571</p>
              </a>
            </div>
            <div className="sb__footer-link-div">
              <h4>Our Socialmedia</h4>
              <div className="socialmedia">
                <p>
                  <i class="fab fa-facebook-f"></i>
                </p>
                <p>
                  <i class="fa-brands fa-instagram"></i>
                </p>
                <p>
                  <i class="fa-brands fa-youtube"></i>
                </p>
              </div>
            </div>
            <hr></hr>

            <div className="sb__footer-below">
              <div className="sb__footer-copyright">
                <p>@{new Date().getFullYear()} LSKK Smart Farming Tracker</p>
              </div>
              <div className="sb__footer-terms">
                <a href="/">
                  <div>
                    <p>Terms & conditions</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
