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
          <div className="mainHeader">
            <p className="bigText">Smart Farming Tracker</p>

            <p className="smallText">
              Dengan fitur pemantauan real-time, prediksi, pengendalian
              otomatis, dan manajemen sumber daya, kami mempermudah pengelolaan
              pertanian Anda agar lebih efisien, berkelanjutan, dan menghasilkan
              hasil panen yang berkualitas.
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
        <h1 className="card-heading">Fitur-Fitur Aplikasi</h1>
        <div className="card-content">
          <div className="card">
            <span className="tag">Feature</span>
            <h2 className="card-title">Pemantauan dan Pemetaan Tanaman</h2>
            <div className="card-info">
              <p className="info">
                Melakukan pemantauan real-time dan pemetaan kondisi tanaman
                berdasarkan data sensor untuk meningkatkan pemahaman dan
                pengambilan keputusan yang tepat.
              </p>
            </div>
          </div>
          <div className="card">
            <span className="tag">Feature</span>
            <h2 className="card-title">
              Pengawasan dan Pengendalian Jarak Jauh
            </h2>
            <div className="card-info">
              <p className="info">
                Memungkinkan pengawasan serta pengendalian perangkat dan kondisi
                pertanian dari jarak jauh melalui platform web atau aplikasi
                seluler.
              </p>
            </div>
          </div>
          <div className="card">
            <span className="tag">Feature</span>
            <h2 className="card-title">Otomatisasi melalui Aktuator</h2>
            <div className="card-info">
              <p className="info">
                Penggunaan data sensor untuk mengontrol aktuator, seperti sistem
                irigasi otomatis dan pemberian nutrisi, untuk memfasilitasi
                tindakan otomatis yang efisien dan tepat waktu pada pertanian.
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
                  <i className="fab fa-facebook-f"></i>
                </p>
                <p>
                  <i className="fa-brands fa-instagram"></i>
                </p>
                <p>
                  <i className="fa-brands fa-youtube"></i>
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
