import React, { useState } from "react";
import SideBar from "../../components/sidebar";
import "../../assets/css/dashboard.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function Dashboard() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [sensorItemClicked, setSensorItemClicked] = useState(false);

  const farmData = [
    {
      name: "Farm 1",
      latitude: -6.929556,
      longitude: 107.627139,
      sensors: [
        {
          name: "Water Flow",
        },
        {
          name: "Water Meter",
        },
        {
          name: "Water Ph",
        },
        {
          name: "Soil Density",
        },
      ],
    },
    {
      name: "Farm 2",
      latitude: -6.923343,
      longitude: 107.629641,
      sensors: [
        {
          name: "Water Flow",
        },
        {
          name: "Soil Density",
        },
      ],
    },
  ];

  const handleMapReady = () => {
    setMapLoaded(true);
  };

  const handleSensorItemClick = () => {
    setSensorItemClicked((prevState) => !prevState);
  };

  return (
    <div className="mainContainer">
        <SideBar onSensorItemClick={handleSensorItemClick} />
      <div className="rightSide">
        <header id="dashboardHead">
          <div className="searchInput">
            <input type="text" className="searchBar" />
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="userProfile">
            <p className="userName">Pendleton</p>
            <img
              className="userProfilePic"
              src="https://img.wattpad.com/5edad7765319cd862679ee6a481c19eadb22a39f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f3979324d3941414a6b64685359673d3d2d3838363634363239372e313630666132353063336133306534623333383235373633393935362e6a7067?s=fit&w=720&h=720"
              alt=""
            />
          </div>
        </header>
        <div
          id="mapContainer"
          className={`${sensorItemClicked ? "divided" : ""}`}
        >
          {sensorItemClicked && (
            <div className="sensorDetails">
              <div className="sensorTitle">
                <p className="sensorName">Water Flow</p>
              </div>
              <div className="sensorData">
                <p className="historyMain">History :</p>
                <div className="historyItems">
                  {["1", "2", "3"].map((item, index) => (
                    <div className="historyItem" key={index}>
                      <p className="historyTitle">Water FLowwwW</p>
                      <div className="historyList">
                        <p className="historyDate">12/12/2021</p>
                        <div className="historyDesc">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Vitae quos, modi impedit nihil accusamus minus
                          ab id ex illo expedita.
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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
