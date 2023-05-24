import React from "react";
import "../assets/css/landing.css";

export default function landingPage() {
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
              <a href={`/dashboard`}>
                <button className="redirectButton">Maps</button>
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}