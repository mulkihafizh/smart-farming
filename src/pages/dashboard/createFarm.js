import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../assets/css/dashboard.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Toast from "../../components/toast";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function CreateFarm() {
  let navigate = useNavigate();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [area, setArea] = useState("");
  const [longitude, setLong] = useState("");
  const [latitude, setLat] = useState("");
  const [cookies] = useCookies(["token"]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const farmData = [
    {
      latitude: -6.929556,
      longitude: 107.627139,
    },
  ];

  const handleMapReady = () => {
    setMapLoaded(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = cookies.token;

    if (!name || !type || !area || !longitude || !latitude) {
      setIsError(true);
      setToastMessage("Semua kolom harus diisi");
      setShowToast(true);
      return;
    }
    const data = {
      name: name,
      type: type,
      farmArea: area,
      longitude: longitude,
      latitude: latitude,
    };
    axios
      .post(
        "https://smartfarming-api-mulkihafizh.vercel.app/farm/create",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success) {
          navigate("/dashboard");
        } else {
          setIsError(true);
          setToastMessage(res.data.message);
          setShowToast(true);
        }
      });
  };
  return (
    <div id="create">
      {showToast && <Toast isError={isError} message={toastMessage} />}
      <div className="createFarm">
        <div id="mapContainer" className="divided">
          <div className="createFormContainer">
            <div className="farmFormTitle">
              <h1>Tambah Lahan</h1>
            </div>
            <div className="farmForm">
              <form method="POST" id="farmInputForm">
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
                    <label htmlFor="farmName">Luas Lahan</label>
                    <input
                      type="text"
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
                      <label htmlFor="farmName">Longitude</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          setLong(e.target.value);
                        }}
                        id="farmLong"
                      />
                    </div>
                    <div className="inputGroup">
                      <label htmlFor="farmName">Latitude</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          setLat(e.target.value);
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

          {!mapLoaded && <div>Loading map...</div>}
          <MapContainer
            center={[-6.929543, 107.627141]}
            zoom={15}
            style={{ height: "100%", borderRadius: "20px" }}
            whenReady={handleMapReady}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution=""
            />
            {farmData.map((farm, index) => (
              <Marker
                key={index}
                position={[farm.latitude, farm.longitude]}
              ></Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
