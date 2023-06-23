import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "../../assets/css/dashboard.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function CreateFarm(props) {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [area, setArea] = useState("");
  const [longitude, setLong] = useState("");
  const [latitude, setLat] = useState("");
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
      props.showToast("Anda Harus Login Terlebih Dahulu", true);
    }
  }, [cookies.token, navigate, props]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !type || !area || !longitude || !latitude) {
      props.showToast("Harus mengisi semua field", true);

      return;
    }
    const data = {
      name: name,
      type: type,
      farmArea: area,
      longitude: longitude,
      latitude: latitude,
      userId: cookies.userId,
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/farm/create", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/dashboard");
          props.showToast("Berhasil Menambahkan Lahan", false);
        }
      })
      .catch((err) => {
        props.showToast(err.response.data.err, true);
      });
  };

  return (
    <div id="create">
      <Link to={`/dashboard`}>
        <i className="fa-solid fa-arrow-left backIcon"></i>
      </Link>
      <div className="createForm">
        <div id="mapContainer" className="formDivided">
          <div className="createFormContainer">
            <div className="farmFormTitle">
              <h1>Tambah Lahan</h1>
            </div>
            <div className="farmForm">
              <form id="farmInputForm">
                <div className="inputGroup">
                  <div className="inputGroup">
                    <label htmlFor="farmName">Nama Lahan</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      id="farmName"
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="farmName">Luas Lahan (Meter)</label>
                    <input
                      type="number"
                      onChange={(e) => {
                        setArea(e.target.value);
                      }}
                      id="farmArea"
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="farmName">Jenis Tanaman</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                      id="farmType"
                    />
                  </div>
                  <div className="inputGroups">
                    <div className="inputGroup">
                      <label htmlFor="farmName">Latitude</label>
                      <input
                        type="number"
                        onChange={(e) => {
                          setLat(e.target.value);
                        }}
                        id="farmLong"
                      />
                    </div>
                    <div className="inputGroup">
                      <label htmlFor="farmName">Longitude</label>
                      <input
                        type="number"
                        onChange={(e) => {
                          setLong(e.target.value);
                        }}
                        id="farmLat"
                      />
                    </div>
                  </div>
                </div>
                <div className="farmSubmitButton">
                  <button type="submit" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {!latitude ||
            (!longitude && (
              <div className="loadingMap">Masukkan Longitude dan Latitude!</div>
            ))}
          {!latitude && !longitude && (
            <div className="loadingMap">Masukkan Longitude dan Latitude!</div>
          )}
          {latitude && longitude && (
            <MapContainer
              center={[latitude, longitude]}
              zoom={15}
              style={{ height: "100%", borderRadius: "20px" }}
              className="formMap"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=""
              />
              <Marker position={[latitude, longitude]}></Marker>
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}
