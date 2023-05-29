import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../assets/css/dashboard.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

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

  const farmData = [
    {
      name: "Farm 1",
      latitude: -6.929556,
      longitude: 107.627139,
      sensors: [
        {
          name: "Water Flow",
          history: [
            {
              date: "2021-08-01",
              title: "Water Flow",
              description: "Water flow is normal",
            },
          ],
        },
        {
          name: "Water Meter",
          history: [
            {
              date: "2021-08-01",
              title: "Water Meter",
              description: "Water Meter is low",
            },
            {
              date: "2021-07-28",
              title: "Water Meter",
              description: "Water Meter is high",
            },
          ],
        },
        {
          name: "Water Ph",
          history: [
            {
              date: "2021-08-01",
              title: "Water Ph",
              description: "Water Ph is normal",
            },
          ],
        },
        {
          name: "Soil Density",
          history: [
            {
              date: "2021-08-01",
              title: "Soil Density",
              description: "Soil Density is normal",
            },
          ],
        },
      ],
    },
  ];

  const handleMapReady = () => {
    setMapLoaded(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = cookies.token;
    console.log(userId);
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
        }
      });
  };
  return (
    <div id="create">
      <div className="createFarm">
        <div id="mapContainer" className="divided">
          <div className="createFormContainer">
            <div className="farmFormTitle">
              <h1>Create Farm</h1>
            </div>
            <div className="farmForm">
              <form method="POST" id="farmInputForm">
                <div className="inputGroup">
                  <div className="inputGroup">
                    <label htmlFor="farmName">Farm Name</label>
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
              <Marker key={index} position={[farm.latitude, farm.longitude]}>
                <Popup>
                  Name: {farm.name}
                  <br />
                  Latitude: {farm.latitude}
                  <br />
                  Longitude: {farm.longitude}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
